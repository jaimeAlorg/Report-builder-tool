import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ReportService } from '../../services/report-service/report-service';
import { CommonModule } from '@angular/common';
import { reportDTO } from '../../models/report-dtos';

@Component({
  selector: 'app-table',
  imports: [MatTableModule, CommonModule],
  templateUrl: './table.html',
  styleUrl: './table.scss'
})
export class Table implements OnInit, OnChanges {
  @Input() reportData: reportDTO | null = null;
  dataSource: any[] = [];
  displayedColumns: string[] = [];

  constructor(private reportService: ReportService) { }

  ngOnInit() {
    this.updateDisplayedColumns();
    this.buildTableData();
  }

  ngOnChanges(simpleChanges: any): void {
    if (simpleChanges['reportData']) {
      this.updateDisplayedColumns();
      this.buildTableData();
    }
  }

  private updateDisplayedColumns(): void {
    if (!this.reportData) {
      this.displayedColumns = [];
      return;
    }

    this.displayedColumns = ['product', 'category', 'region'];

    if (this.reportData.includeId) {
      this.displayedColumns.unshift('id');
    }

    if (this.reportData.dateRange) {
      this.displayedColumns.push('date');
    }

    if (this.reportData.includeSalesData) {
      this.displayedColumns.push('sales');
    }
  }

  buildTableData(): void {
    if (!this.reportData) {
      this.dataSource = [];
      return;
    }

    this.reportService.buildTableData(this.reportData).subscribe((data) => {
      this.dataSource = data;
    });
  }
}
