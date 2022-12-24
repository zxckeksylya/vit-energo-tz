import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  ChangeDetectorRef,
} from '@angular/core';
import { Post } from 'src/app/shared/interfaces/post.interface';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { CreatePost } from '../../../../shared/interfaces/post.interface';
import { OnInit } from '@angular/core';
import { AppState } from '../../../../store/app.reducers';
import { select, Store } from '@ngrx/store';
import { getCategoriesSelector } from '../../../../store/categories/category.selectors';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss'],
})
export class PostFormComponent implements OnChanges,OnInit {
  @Input() public post!: Post;

  @Output() public submitted = new EventEmitter<CreatePost>();

  public form!: FormGroup;

  public categories:{label:string,value:string}[] = [];

  private destroy$ = new Subject<void>();

  constructor(private fb: FormBuilder, private location: Location,private store:Store<AppState>,private cdr:ChangeDetectorRef) {
    this.initForm();
  }

  public ngOnInit(): void {
    this.store.pipe(select(getCategoriesSelector),takeUntil(this.destroy$)).subscribe(data=>{
      this.categories = data.map(x=>({label:x.name,value:x.id}))
      this.cdr.markForCheck()
    })
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
      categories: [],
    });
  }
}
