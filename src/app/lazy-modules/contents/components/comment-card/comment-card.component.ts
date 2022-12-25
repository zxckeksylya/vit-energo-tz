import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { Comment } from 'src/app/shared/interfaces/comment.interface';
import { AppState } from '../../../../store/app.reducers';
import { getCommentById, isChangebleCommentByIdSelector } from '../../../../store/comments/comments.selectors';

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.scss'],
})
export class CommentCardComponent implements OnInit, OnDestroy {
  @Input() public commentId!: string;

  public comment!: Comment;

  public commentForm!:FormGroup;

  public change = true;

  public viewButtons = false;

  private destroy$ = new Subject<void>();

  constructor(private store: Store<AppState>,private fb:FormBuilder) {
    this.initForm();
  }

  public ngOnInit(): void {
    this.store
      .pipe(select((state) => getCommentById(state, { id: this.commentId })),takeUntil(this.destroy$))
      .subscribe((comment) => {
        this.commentForm.patchValue(comment,{emitEvent:false})
        this.comment = comment});
        
    this.store.pipe(select(state=>isChangebleCommentByIdSelector(state,{id:this.commentId})),takeUntil(this.destroy$)).subscribe(p=>this.viewButtons=p)
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onSubmit():void {
    this.change = true
  }

  public onChange():void{
    this.change = false
  }

  private initForm():void{
    this.commentForm = this.fb.group({
      content:''
    })
  }
}
