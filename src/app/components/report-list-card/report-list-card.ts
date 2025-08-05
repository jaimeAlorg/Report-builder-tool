import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { ReportService } from '../../services/report-service';
import { reportItemDTO } from '../../models/report-dtos';

@Component({
  selector: 'app-report-list-card',
  imports: [CommonModule, MatDividerModule, MatIconModule, MatButtonModule],
  templateUrl: './report-list-card.html',
  styleUrl: './report-list-card.scss'
})
export class ReportListCard implements OnInit {
  @Output() reportSelected: EventEmitter<number> = new EventEmitter<number>();
  reportList: reportItemDTO[] = [];

  constructor(private reportService: ReportService) { }

  ngOnInit(): void {
    this.getReportList();
  }

  getReportList(): void {
    this.reportService.getReportList().subscribe({
      next: (reportList) => {
        this.reportList = reportList.map((report, index) => ({
          ...report,
          selected: index === 0
        }));

        if (this.reportList.length > 0 && this.reportList[0].id) {
          this.reportSelected.emit(this.reportList[0].id);
        }
      },
      error: (error) => {
        console.error('Error loading report list:', error);
      }
    });
  }

  onReportClick(report: reportItemDTO): void {
    this.reportList.forEach(r => r.selected = false);
    report.selected = true;
    this.reportSelected.emit(report.id);
  }
}
