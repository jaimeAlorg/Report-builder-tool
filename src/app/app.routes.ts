import { Routes } from '@angular/router';
import { ReportViewer } from './pages/report-viewer/report-viewer';

export const routes: Routes = [
    { path: '', redirectTo: '/reports', pathMatch: 'full' },
    { path: 'reports', component: ReportViewer, title: 'Report Viewer' },
    { path: '**', redirectTo: '/reports' }
];
