import { Injectable } from '@angular/core';
import reportData from '../data/mock_reports.json';
import salesDate from '../data/mock_sales_data.json';
import { reportItemDTO, reportDTO } from '../models/report-dtos';
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

  getReportListByFilters() { }

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
          products: report.product,
          category: report.category,
          region: report.region,
          salesRange: (report.salesRange?.min && report.salesRange?.max) ? this.buildStringRange(report.salesRange) : null,
          dateRange: (report.dateRange?.start && report.dateRange?.end) ? this.buildStringRange({ min: report.dateRange.start, max: report.dateRange.end }) : null,
          filterSelection: report.filterSelection || []
        } as reportDTO);
        observer.complete();
      });
    }
    return null;
  }

  buildStringRange(range: { min: string | number, max: string | number }): string {
    let rangeString = range.min.toString() + ' | ' + range.max.toString();

    return rangeString;
  }

  getReportTableData(tableHeaders: string[]): Observable<any[]> {
    return new Observable<any[]>(observer => {
      const data = salesDate.map((item: any) => {
        const row: any = {};
        tableHeaders.forEach(header => {
          row[header] = item[header];
        });
        return row;
      });
      observer.next(data);
      observer.complete();
    });
  }

  saveReport(reportData: any) { }

}
