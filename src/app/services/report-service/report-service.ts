import { Injectable } from '@angular/core';
import reportData from '../../data/mock_reports.json';
import salesData from '../../data/mock_sales_data.json';
import { ReportItemDTO, ReportDTO } from '../../models/report-dtos';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private reportCreatedSubject = new Subject<ReportItemDTO>();
  public reportCreated$ = this.reportCreatedSubject.asObservable();

  constructor() { }

  getReportList(): Observable<ReportItemDTO[]> {
    const savedReports = localStorage.getItem('savedReports');
    let reportList: ReportItemDTO[] = [];

    if (savedReports) {
      return new Observable<ReportItemDTO[]>(observer => {
        JSON.parse(savedReports).forEach((report: any) => {
          let reportItem: ReportItemDTO = {
            id: report.id,
            title: report.title,
            creationDate: report.creationDate,
            creationTime: report.creationTime,
            author: report.author,
          };
          reportList.push(reportItem);
        });
        observer.next(reportList);
        observer.complete();
      });
    } else {
      return new Observable<ReportItemDTO[]>(observer => {
        observer.next([]);
        observer.complete();
      });
    }
  }

  getReportData(reportId: number): Observable<ReportDTO> | null {
    const savedReports = localStorage.getItem('savedReports');
    const report = savedReports ? JSON.parse(savedReports).find((report: any) => report.id === reportId) : null;
    if (report) {
      return new Observable<ReportDTO>(observer => {
        observer.next({
          id: report.id,
          title: report.title,
          creationDate: report.creationDate,
          creationTime: report.creationTime,
          author: report.author,
          product: report.product || [],
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


  buildMockReportsInLocalStorage(): void {
    if (localStorage.getItem('savedReports')) {
      return;
    }

    const reports = reportData.map(report => {
      const { id, title, creationDate, creationTime, author, products, category, region, includeId, includeSalesData, dateRange } = report;
      return { id, title, creationDate, creationTime, author, products, category, region, includeId, includeSalesData, dateRange };
    });
    localStorage.setItem('savedReports', JSON.stringify(reports));
  }

  buildTableData(reportDTO: ReportDTO | null): Observable<any[]> {
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
        const productMatch = !reportDTO.product.length ||
          reportDTO.product.some(p => p.toLowerCase() === item.product.toLowerCase());

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

  saveReportToLocalStorage(report: ReportItemDTO) {
    const savedReports = localStorage.getItem('savedReports');
    const reportsArray = savedReports ? JSON.parse(savedReports) : [];
    reportsArray.push(report);
    localStorage.setItem('savedReports', JSON.stringify(reportsArray));

    this.reportCreatedSubject.next(report);
  }

  generateReportId(): number {
    const savedReports = localStorage.getItem('savedReports');
    const reportsArray = savedReports ? JSON.parse(savedReports) : [];
    const maxId = Math.max(0, ...reportsArray.map((r: any) => r.id || 0));
    return maxId + 1;
  }
}
