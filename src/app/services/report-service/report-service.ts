import { Injectable } from '@angular/core';
import reportData from '../../data/mock_reports.json';
import salesData from '../../data/mock_sales_data.json';
import { reportItemDTO, reportDTO } from '../../models/report-dtos';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor() { }

  getReportList(): Observable<reportItemDTO[]> {
    let reportList: reportItemDTO[] = [];

    return new Observable<reportItemDTO[]>(observer => {
      reportData.forEach((report: any) => {
        let reportItem: reportItemDTO = {
          id: report.id,
          title: report.title,
          creationDate: report.creationDate,
          creationTime: report.creationTime,
          author: report.author,
        }
        reportList.push(reportItem);
      });
      observer.next(reportList);
      observer.complete();
    });
  }

  getReportData(reportId: number): Observable<reportDTO> | null {
    const report = reportData.find((report: any) => report.id === reportId);
    if (report) {
      return new Observable<reportDTO>(observer => {
        observer.next({
          id: report.id,
          title: report.title,
          creationDate: report.creationDate,
          creationTime: report.creationTime,
          author: report.author,
          products: report.products || [],
          category: report.category || [],
          region: report.region || [],
          dateRange: (report.dateRange?.start && report.dateRange?.end) ? { start: report.dateRange.start, end: report.dateRange.end } : undefined,
          includeId: report.includeId,
          includeSalesData: report.includeSalesData
        });
        observer.complete();
      });
    }
    return null;
  }

  buildTableData(reportDTO: reportDTO | null): Observable<any[]> {
    return new Observable<any[]>(observer => {
      if (!reportDTO) {
        observer.next([]);
        observer.complete();
        return;
      }

      let data = [...salesData];

      if (reportDTO.dateRange) {
        const start = new Date(reportDTO.dateRange.start);
        const end = new Date(reportDTO.dateRange.end);
        data = data.filter(item => {
          const itemDate = new Date(item.date);
          return itemDate >= start && itemDate <= end;
        });
      }

      data = data.filter(item => {
        const productMatch = !reportDTO.products.length ||
          reportDTO.products.some(p => p.toLowerCase() === item.product.toLowerCase());

        const categoryMatch = !reportDTO.category.length ||
          reportDTO.category.some(c => c.toLowerCase() === item.category.toLowerCase());

        const regionMatch = !reportDTO.region.length ||
          reportDTO.region.some(r => r.toLowerCase() === item.region.toLowerCase());

        return productMatch && categoryMatch && regionMatch;
      });

      const tableData = data.map(item => {
        const row: any = {
          product: item.product,
          category: item.category,
          region: item.region
        };

        if (reportDTO.dateRange) {
          row.date = item.date;
        }

        if (reportDTO.includeId) {
          row.id = item.id;
        }

        if (reportDTO.includeSalesData) {
          row.sales = item.sales;
        }

        return row;
      });

      observer.next(tableData);
      observer.complete();
    });
  }

  saveReport(reportData: any) { }

}
