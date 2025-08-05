import { Component } from '@angular/core';
import { ReportListCard } from '../../components/report-list-card/report-list-card';
import { MatDivider } from "@angular/material/divider";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Table } from '../../components/table/table';

@Component({
  selector: 'app-report-viewer',
  imports: [ReportListCard, MatDivider, MatButtonModule, MatIconModule, MatTableModule, Table],
  templateUrl: './report-viewer.html',
  styleUrl: './report-viewer.scss'
})
export class ReportViewer {
}
