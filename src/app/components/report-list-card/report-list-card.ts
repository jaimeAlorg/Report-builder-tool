import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

interface Report {
  id: string;
  title: string;
  creationDate: string;
  author: string;
  selected?: boolean;
}

@Component({
  selector: 'app-report-list-card',
  imports: [CommonModule, MatDividerModule, MatIconModule, MatButtonModule],
  templateUrl: './report-list-card.html',
  styleUrl: './report-list-card.scss'
})
export class ReportListCard {
  @Input() reportList: Report[] = [
    {
      id: '1',
      title: 'Q1 Financial Report 2025',
      creationDate: '2025-01-15',
      author: 'John Doe',
      selected: false
    },
    {
      id: '2',
      title: 'Marketing Analysis Q4 2024',
      creationDate: '2024-12-20',
      author: 'Jane Smith',
      selected: false
    },
    {
      id: '3',
      title: 'Product Development Review',
      creationDate: '2025-01-10',
      author: 'Mike Johnson',
      selected: false
    }
  ];

  onReportClick(report: Report): void {
    this.reportList.forEach(r => r.selected = false);
    report.selected = true;
  }
}
