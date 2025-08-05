import { Component } from '@angular/core';
import { ReportListCard } from '../../components/report-list-card/report-list-card';
import { MatDivider } from "@angular/material/divider";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Table } from '../../components/table/table';
import { ReportService } from '../../services/report-service';
import { CommonModule } from '@angular/common';
import { reportDTO } from '../../models/report-dtos';

@Component({
  selector: 'app-report-viewer',
  imports: [ReportListCard, MatDivider, MatButtonModule, MatIconModule, MatTableModule, Table, CommonModule],
  templateUrl: './report-viewer.html',
  styleUrl: './report-viewer.scss'
})
export class ReportViewer {
  reportData: reportDTO | null = null;
  activeFilters: { label: string; value: string }[] = [];

  constructor(private reportService: ReportService) { }

  onReportSelected(reportId: number): void {
    this.reportService.getReportData(reportId)?.subscribe(reportData => {
      this.reportData = reportData;
      this.getActiveFilters();
    })
  }

  getActiveFilters(): void {
    this.activeFilters = [];

    if (!this.reportData) return;

    const filterMappings = [
      { key: 'products', label: 'Products' },
      { key: 'category', label: 'Category' },
      { key: 'region', label: 'Region' },
      { key: 'salesRange', label: 'Sales range' },
      { key: 'dateRange', label: 'Date range' }
    ];

    filterMappings.forEach(filter => {
      const value = this.reportData![filter.key as keyof reportDTO];
      if (value) {
        this.activeFilters.push({
          label: filter.label,
          value: value as string
        });
      }
    });
  }
}
