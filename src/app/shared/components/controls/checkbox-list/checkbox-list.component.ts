import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChange } from '@angular/core';
import { ControlValueAccessor, FormBuilder, NgControl } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-checkbox-list',
  templateUrl: './checkbox-list.component.html',
  styleUrls: ['./checkbox-list.component.scss'],
})
export class CheckboxListComponent
  implements ControlValueAccessor, OnInit, OnDestroy,OnChanges
{
  @Input() public label = ''

  @Input() public list: {label:string,value:string}[] = [];

  public formControlArray = this.fb.array([]);

  private destroy$ = new Subject<void>();

  private listValues: string[] = [];

  constructor(private fb: FormBuilder, private ngControl: NgControl) {
    this.ngControl.valueAccessor = this;
  }

  public ngOnInit(): void {
    this.onInputValueChanges();
  }

  public ngOnChanges(changes: {list:SimpleChange}): void {
    if(changes.list && changes.list.currentValue){
    
      if(this.formControlArray.length===0){
        changes.list.currentValue.forEach((x: { value: string; })=>{
          console.log('mme')
          if(this.listValues.includes(x.value)){
            this.formControlArray.push(this.fb.control(true))
          }else{
            this.formControlArray.push(this.fb.control(false))
          }
        })
      }
      console.log(this.formControlArray)
    }
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public writeValue(value: any): void {

    if (value) {
      this.listValues = value;
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
      this.formControlArray.disable();
    } else {
      this.formControlArray.enable();
    }
  }

  public onTouched: () => void = () => {};

  private onChange: (value: any) => void = () => {};

  private onInputValueChanges(): void {
    this.formControlArray.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((v) => {
        const formsControlArray = this.formControlArray.getRawValue();
        const currentValue = this.list.filter(
          (x, i) => formsControlArray[i]
        ).map(x=>x.value);
        this.listValues = currentValue;
        this.onChange(currentValue);
      });
  }
}
