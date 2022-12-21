import { Directive, OnDestroy, OnInit, Optional } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

@Directive()
export class BaseControl implements OnInit, OnDestroy, ControlValueAccessor {
  public formControl = new FormControl();

  private destroy$ = new Subject<void>();

  constructor(@Optional() protected ngControl: NgControl) {
    this.ngControl.valueAccessor = this;
  }

  public ngOnInit(): void {
    this.onInputValueChanges();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public writeValue(value: any): void {
    if (value) {
      this.formControl.setValue(value, { emitEvent: false });
    }
  }

  public registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.formControl.disable();
    } else {
      this.formControl.enable();
    }
  }

  public onTouched: () => void = () => {};

  protected onChange: (value: any) => void = () => {};

  protected onInputValueChanges(): void {
    this.formControl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((v) => this.onChange(v));
  }
}
