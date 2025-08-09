import { Component, inject, OnInit } from '@angular/core';
import { Dialog } from "../dialog/dialog";
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';
import filterData from '../../data/mock_filters.json';
import { ReportService } from '../../services/report-service/report-service';
import { ReportDTO, ReportItemDTO } from '../../models/report-dtos';
@Component({
  selector: 'app-create-popup',
  imports: [Dialog, MatFormFieldModule, MatSelectModule, MatInputModule, ReactiveFormsModule, MatButtonModule, MatDatepickerModule, MatNativeDateModule, MatCheckboxModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './create-popup.html',
  styleUrl: './create-popup.scss'
})
export class CreatePopup implements OnInit {
  private dialogRef = inject(MatDialogRef<CreatePopup>)
  categoriesOptions: string[] = [];
  regionOptions: string[] = [];
  productOptions: string[] = [];

  createReportForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(255)]),
    category: new FormControl([], [Validators.required]),
    regions: new FormControl([], [Validators.required]),
    product: new FormControl([], [Validators.required]),
    dateRange: new FormGroup({
      start: new FormControl(null),
      end: new FormControl(null)
    }),
    includeId: new FormControl(false),
    includeSalesData: new FormControl(false)
  });

  constructor(private reportService: ReportService) { }

  ngOnInit(): void {
    this.populateFilters();
  }

  createReport(): void {
    if (this.createReportForm.valid) {
      const formData = this.createReportForm.value;
      let newReport: ReportItemDTO = this.mapFormToReportDTO(formData);
      this.reportService.saveReportToLocalStorage(newReport);
      this.dialogRef.close(formData);
    } else {
      this.markAllControlsAsTouched(this.createReportForm);
    }
  }

  resetForm(): void {
    this.createReportForm.reset();
  }

  populateFilters(): void {
    this.categoriesOptions = filterData.categories;
    this.regionOptions = filterData.regions;
    this.productOptions = filterData.products.map((product: { name: string; }) => product.name);
  }

  mapFormToReportDTO(formData: any): ReportDTO {
    const reportDTO: ReportDTO = {
      id: Date.now(),
      title: formData.title,
      creationDate: new Date().toISOString().split('T')[0],
      creationTime: new Date().toTimeString().split(' ')[0].substring(0, 5),
      author: 'Jaime Arturo Álvarez Orgaz', //Current user
      product: formData.product,
      category: formData.category,
      region: formData.regions,
      dateRange: {
        start: formData.dateRange.start,
        end: formData.dateRange.end
      },
      includeId: formData.includeId,
      includeSalesData: formData.includeSalesData
    };

    return reportDTO;
  }

  private markAllControlsAsTouched(formGroup: FormGroup | FormArray): void {
    Object.values(formGroup.controls).forEach(control => {
      if (control instanceof FormGroup || control instanceof FormArray) {
        this.markAllControlsAsTouched(control);
      } else {
        control.markAsTouched();
        control.updateValueAndValidity();
      }
    });
  }
}
