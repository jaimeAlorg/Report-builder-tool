import { Component } from '@angular/core';
import { ReportListCard } from '../../components/report-list-card/report-list-card';

@Component({
  selector: 'app-report-viewer',
  imports: [ReportListCard],
  templateUrl: './report-viewer.html',
  styleUrl: './report-viewer.scss'
})
export class ReportViewer {

}
