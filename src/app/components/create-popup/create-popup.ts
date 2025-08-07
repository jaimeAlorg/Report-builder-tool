import { Component } from '@angular/core';
import { Dialog } from "../dialog/dialog";
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-create-popup',
  imports: [Dialog, MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule, MatButtonModule, MatDatepickerModule, MatNativeDateModule, MatCheckboxModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './create-popup.html',
  styleUrl: './create-popup.scss'
})
export class CreatePopup {

  foods: any[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
  ];

  createReport(): void { }
  cancelReport(): void { }

}
