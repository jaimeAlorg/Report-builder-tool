import { Component, OnInit, HostListener } from '@angular/core';
import { ReportListCard } from '../../components/report-list-card/report-list-card';
import { MatDivider } from "@angular/material/divider";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Table } from '../../components/table/table';
import { ReportService } from '../../services/report-service/report-service';
import { reportDTO } from '../../models/report-dtos';

@Component({
  selector: 'app-report-viewer',
  imports: [ReportListCard, MatDivider, MatButtonModule, MatIconModule, MatTableModule, Table],
  templateUrl: './report-viewer.html',
  styleUrl: './report-viewer.scss'
})
export class ReportViewer implements OnInit {
  reportData: reportDTO | null = null;
  activeFilters: { label: string; value: string }[] = [];
  selectedReportId: number | null = null;
  isMobile: boolean = false;

  MOBILE_BREAKPOINT: number = 1000;

  constructor(private reportService: ReportService) { }

  ngOnInit() {
    this.checkMobile();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkMobile();
  }

  private checkMobile() {
    this.isMobile = window.innerWidth <= this.MOBILE_BREAKPOINT;
  }

  onReportSelected(reportId: number | null): void {
    if (reportId === null) {
      this.reportData = null;
      this.selectedReportId = null;
      return;
    }

    this.selectedReportId = reportId;
    this.reportService.getReportData(reportId)?.subscribe(reportData => {
      this.reportData = reportData;
      this.getActiveFilters();
    })
  }

  goBackToReportList(): void {
    this.selectedReportId = null;
    this.reportData = null;
  }

  getActiveFilters(): void {
    this.activeFilters = [];

    if (!this.reportData) return;

    if (this.reportData.products) {
      this.activeFilters.push({
        label: 'Products',
        value: this.reportData.products.join(', ')
      });
    }

    if (this.reportData.category) {
      this.activeFilters.push({
        label: 'Category',
        value: this.reportData.category.join(', ')
      });
    }

    if (this.reportData.region) {
      this.activeFilters.push({
        label: 'Region',
        value: this.reportData.region.join(', ')
      });
    }

    if (this.reportData.dateRange) {
      this.activeFilters.push({
        label: 'Date range',
        value: `${this.reportData.dateRange.start} | ${this.reportData.dateRange.end}`
      });
    }
  }
}
