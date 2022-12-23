import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Post } from 'src/app/shared/interfaces/post.interface';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { CreatePost } from '../../../../shared/interfaces/post.interface';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss'],
})
export class PostFormComponent implements OnChanges {
  @Input() public post!: Post;

  @Output() public submitted = new EventEmitter<CreatePost>();

  public form!: FormGroup;

  constructor(private fb: FormBuilder, private location: Location) {
    this.initForm();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['post'] && changes['post'].currentValue) {
      this.form.patchValue(changes['post'].currentValue, {
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
      title: '',
      content: '',
      categories: '',
    });
  }
}
