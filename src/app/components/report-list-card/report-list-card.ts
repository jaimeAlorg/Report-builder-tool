import { CommonModule, formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { ReportService } from '../../services/report-service/report-service';
import { ReportItemDTO } from '../../models/report-dtos';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-report-list-card',
  imports: [CommonModule, MatDividerModule, MatIconModule, MatButtonModule],
  templateUrl: './report-list-card.html',
  styleUrl: './report-list-card.scss'
})
export class ReportListCard implements OnInit, OnDestroy {
  @Output() reportSelected: EventEmitter<number | null> = new EventEmitter<number | null>();
  @Input() isMobileView: boolean = false;
  reportList: ReportItemDTO[] = [];
  selectedReport: ReportItemDTO | null = null;
  private reportCreatedSubscription: Subscription = new Subscription();

  constructor(private reportService: ReportService) { }

  ngOnInit(): void {
    this.getReportList();
    this.orderReportsByDateAndTime();

    this.reportCreatedSubscription = this.reportService.reportCreated$.subscribe((reportItem) => {
      this.getReportList();
      this.orderReportsByDateAndTime();
      this.onReportClick(reportItem);
    });
  }

  ngOnDestroy(): void {
    this.reportCreatedSubscription.unsubscribe();
  }

  ngOnChanges(): void {
    if (!this.isMobileView) {
      this.reportList.forEach(report => report.selected = false);
    }
  }

  getReportList(): void {
    this.reportService.getReportList().subscribe({
      next: (reportList) => {
        this.reportList = reportList.map((report, index) => ({
          ...report,
          creationDate: formatDate(report.creationDate, 'dd/MM/yyyy', 'en-US'),
          creationTime: report.creationTime,
        }));
      },
      error: (error) => {
        console.error('Error loading report list:', error);
      }
    });
  }

  orderReportsByDateAndTime(): void {
    this.reportList.sort((a, b) => {
      const dateA = new Date(a.creationDate).getTime();
      const dateB = new Date(b.creationDate).getTime();
      const timeA = new Date(`1970-01-01T${a.creationTime}`).getTime();
      const timeB = new Date(`1970-01-01T${b.creationTime}`).getTime();
      return dateB - dateA || timeB - timeA;
    });
  }

  onReportClick(report: ReportItemDTO): void {
    if (this.selectedReport === report && report.selected) {
      report.selected = !report.selected;
      this.reportSelected.emit(null);
    } else {
      this.reportList.forEach(r => r.selected = false);
      this.selectedReport = report;
      report.selected = true;
      this.reportSelected.emit(report.id);
    }
  }
}
