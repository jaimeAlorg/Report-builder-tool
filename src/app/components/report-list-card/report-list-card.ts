import { CommonModule, formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { ReportService } from '../../services/report-service/report-service';
import { reportItemDTO } from '../../models/report-dtos';

@Component({
  selector: 'app-report-list-card',
  imports: [CommonModule, MatDividerModule, MatIconModule, MatButtonModule],
  templateUrl: './report-list-card.html',
  styleUrl: './report-list-card.scss'
})
export class ReportListCard implements OnInit {
  @Output() reportSelected: EventEmitter<number | null> = new EventEmitter<number | null>();
  @Input() isMobileView: boolean = false;
  reportList: reportItemDTO[] = [];
  selectedReport: reportItemDTO | null = null;

  constructor(private reportService: ReportService) { }

  ngOnInit(): void {
    this.getReportList();
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

  onReportClick(report: reportItemDTO): void {
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
