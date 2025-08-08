import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ReportService } from '../../services/report-service/report-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table',
  imports: [MatTableModule, CommonModule],
  templateUrl: './table.html',
  styleUrl: './table.scss'
})
export class Table implements OnInit, OnChanges {
  @Input() selectedColumns: string[] = [];
  dataSource: any[] = [];
  displayedColumns: string[] = [];

  constructor(private reportService: ReportService) { }

  ngOnInit() {
    this.getTableData();
  }

  ngOnChanges(simpleChanges: any): void {
    if (simpleChanges['selectedColumns']) {
      this.updateDisplayedColumns();
      this.getTableData();

    }
  }

  private updateDisplayedColumns(): void {
    if (this.selectedColumns && this.selectedColumns.length > 0) {
      this.displayedColumns = [...this.selectedColumns];
    }
  }

  getTableData(): void {
    this.reportService.getReportTableData(this.displayedColumns).subscribe({
      next: (data) => {
        this.dataSource = data;
      },
      error: (error) => {
        console.error('Error updating table data:', error);
      }
    });
  }
}
