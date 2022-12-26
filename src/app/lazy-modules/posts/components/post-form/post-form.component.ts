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
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { CreatePost } from '../../../../shared/interfaces/post.interface';
import { OnInit, OnDestroy } from '@angular/core';
import { AppState } from '../../../../store/app.reducers';
import { select, Store } from '@ngrx/store';
import { getCategoriesSelector } from '../../../../store/categories/category.selectors';
import { Subject, takeUntil, finalize, Observable } from 'rxjs';
import { ImagesService } from '../../../../shared/services/images.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss'],
})
export class PostFormComponent implements OnChanges, OnInit,OnDestroy {
  @Input() public post!: Post;

  @Output() public submitted = new EventEmitter<CreatePost>();

  public form!: FormGroup;

  public imgUrl='';

  public categories: { label: string; value: string }[] = [];

  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private store: Store<AppState>,
    private imagesService:ImagesService,
    private afs:AngularFireStorage
  ) {
    this.initForm();
  }

  public ngOnInit(): void {
    this.store
      .pipe(select(getCategoriesSelector), takeUntil(this.destroy$))
      .subscribe((data) => {
        this.categories = data.map((x) => ({ label: x.name, value: x.id }));
      });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['post'] && changes['post'].currentValue) {
      this.form.patchValue(changes['post'].currentValue, {
        emitEvent: false,
      });
    }
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }
    this.submitted.emit({...this.form.getRawValue(),imgUrl:this.imgUrl});
  }

  public back(): void {
    this.form.reset();
    this.location.back();
  }

  public upload(event:any){

    const randomId = Math.random().toString(36).substring(2);
    const imagePath = '/images/'+randomId;
    const ref = this.afs.ref('/images/'+randomId);

    const task = ref.put(event.target.files[0]);
    let downloadURL: Observable<string>;
    task.snapshotChanges().pipe(
        finalize(()=>{downloadURL = ref.getDownloadURL();
        downloadURL.pipe(takeUntil(this.destroy$)).subscribe(url=>this.imgUrl = url)
        } 
            
        )
    ).subscribe();
  };

  private initForm(): void {
    this.form = this.fb.group({
      title: ['', [Validators.required]],
      content: ['', [Validators.required]],
      categories: [[], [Validators.required]],
    });
  }
}
