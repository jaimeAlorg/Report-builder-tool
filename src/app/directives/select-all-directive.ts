import { Directive, AfterViewInit, OnDestroy, Input, inject } from '@angular/core';
import { MatSelect, MatOption } from '@angular/material/select';
import { Subscription } from 'rxjs';

@Directive({
  selector: 'mat-option[selectAll]',
  standalone: true,
})
export class SelectAllDirective implements AfterViewInit, OnDestroy {
  @Input({ required: true }) allValues: any[] = [];

  private _matSelect = inject(MatSelect);
  private _matOption = inject(MatOption);

  private _subscriptions: Subscription[] = [];

  ngAfterViewInit(): void {
    const parentSelect = this._matSelect;
    const parentFormControl = parentSelect.ngControl.control;

    this._subscriptions.push(
      this._matOption.onSelectionChange.subscribe((ev) => {
        if (ev.isUserInput) {
          if (ev.source.selected) {
            parentFormControl?.setValue(this.allValues);
            this._matOption.select(false);
          } else {
            parentFormControl?.setValue([]);
            this._matOption.deselect(false);
          }
        }
      })
    );
    this._subscriptions.push(
      parentSelect.optionSelectionChanges.subscribe((v) => {
        if (v.isUserInput && v.source.value !== this._matOption.value) {
          if (!v.source.selected) {
            this._matOption.deselect(false);
          } else {
            if (parentFormControl?.value.length === this.allValues.length) {
              this._matOption.select(false);
            }
          }
        }
      })
    );

    setTimeout(() => {
      if (parentFormControl?.value.length === this.allValues.length) {
        this._matOption.select(false);
      }
    });
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach((s) => s.unsubscribe());
  }
}