import { Component, inject, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dialog',
  imports: [MatIconModule],
  templateUrl: './dialog.html',
  styleUrl: './dialog.scss'
})
export class Dialog {
  @Input() dialogTitle: string = 'Default Title';
  private dialogRef = inject(MatDialogRef<Dialog>)

  closeDialog(): void {
    this.dialogRef.close();
  }
}
