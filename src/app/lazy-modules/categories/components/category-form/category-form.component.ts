import { Location } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Category } from 'src/app/shared/interfaces/category.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
})
export class CategoryFormComponent implements OnChanges {
  @Input() public category!: Category;

  @Output() public submitted = new EventEmitter<Category>();

  public form!: FormGroup;

  constructor(private fb: FormBuilder, private location: Location) {
    this.initForm();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['category'] && changes['category'].currentValue) {
      this.form.patchValue(changes['category'].currentValue, {
        emitEvent: false,
      });
    }
  }

  public onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }
    this.submitted.emit(this.form.getRawValue());
  }

  public back(): void {
    this.form.reset();
    this.location.back();
  }

  private initForm(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
    });
  }
}
