import { Component, Input, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dialog',
  imports: [MatIconModule],
  templateUrl: './dialog.html',
  styleUrl: './dialog.scss'
})
export class Dialog {
  @Input() dialogTitle: string = 'Default Title';

  constructor() {
  }

  closeDialog(): void {
    console.log('Dialog closed');
  }
}
