import { Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-table',
  imports: [MatTableModule],
  templateUrl: './table.html',
  styleUrl: './table.scss'
})
export class Table {
  @Input() selectedColumns: any[] = [];

  displayedColumns: string[] = ['position', 'name', 'category', 'revenue'];

  dataSource = [
    { position: 1, name: 'Product A', category: 'Electronics', revenue: 1000 },
    { position: 2, name: 'Product B', category: 'Electronics', revenue: 2000 },
    { position: 3, name: 'Product C', category: 'Electronics', revenue: 1500 },
  ];

}
