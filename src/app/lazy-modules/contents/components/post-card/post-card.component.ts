import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { TablePostItem } from '../../../../shared/interfaces/post.interface';
import { ImagesService } from '../../../../shared/services/images.service';
import { AppState } from '../../../../store/app.reducers';
import { createCommentAction } from '../../../../store/comments/comments.action';
import { changeLikePost } from '../../../../store/posts/posts.actions';
import { take } from 'rxjs';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostCardComponent implements OnInit {
  @Input() post!: TablePostItem;

  public likeControl = new FormControl();

  public commentForm!: FormGroup;

  public imgLink = '';

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private imagesService: ImagesService,
    private cdref: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.likeControl.valueChanges.pipe().subscribe((v) => {
      this.store.dispatch(changeLikePost({ id: this.post.id }));
    });
    this.initCommentForm();

    this.imagesService.getImageLink(this.post.imgUrl).pipe(take(1)).subscribe((imgLink) => {
      this.imgLink = imgLink;
      console.log(imgLink);
      this.cdref.markForCheck();
    });
  }

  public initCommentForm(): void {
    this.commentForm = this.fb.group({
      content: ['', Validators.required],
    });
  }

  public onSubmitForm(): void {
    if (this.commentForm.invalid) {
      return;
    }
    this.store.dispatch(
      createCommentAction({
        postId: this.post.id,
        comment: this.commentForm.getRawValue(),
      })
    );
  }
}
