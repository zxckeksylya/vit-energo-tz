import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../../store/app.reducers';
import {
  getLikeByIdSelector,
  getLikeStatusByLikeId,
} from '../../../../store/likes/likes.selectors';
import { Like } from '../../../../shared/interfaces/like.interface';
import { FormControl } from '@angular/forms';
import { changeLikePost } from '../../../../store/posts/posts.actions';
import { Post } from '../../../../shared/interfaces/post.interface';
import { changeLikeByIdAction } from '../../../../store/likes/likes.actions';

@Component({
  selector: 'app-like-card',
  templateUrl: './like-card.component.html',
  styleUrls: ['./like-card.component.scss'],
})
export class LikeCardComponent implements OnInit {
  @Input() public likeId = '';

  public like!: Like;

  public likeControl = new FormControl();

  constructor(private store: Store<AppState>) {}

  public ngOnInit(): void {
    this.store
      .pipe(select((state) => getLikeByIdSelector(state, { id: this.likeId })))
      .subscribe((like) => {
        this.like = like;
      });

    this.store
      .pipe(
        select((state) => getLikeStatusByLikeId(state, { id: this.likeId }))
      )
      .subscribe((p) => this.likeControl.patchValue(p, { emitEvent: false }));

      this.likeControl.valueChanges.pipe().subscribe(v=>{
        this.store.dispatch(changeLikeByIdAction({id:this.likeId}))})
  }
}
