import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/app.reducers';
import { initCategoriesStoreAction } from '../../../../store/categories/category.actions';
import { initPostsStoreAction } from '../../../../store/posts/posts.actions';
import { initCommentsStoreAction } from '../../../../store/comments/comments.action';
import { initUserAction } from 'src/app/store/auth/auth.actions';
import { initLikesStoreAction } from '../../../../store/likes/likes.actions';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  constructor(private store: Store<AppState>) {
    this.store.dispatch(initPostsStoreAction());
  }

  public ngOnInit(): void {
    this.initData();
  }

  private initData(): void {
    this.store.dispatch(initCategoriesStoreAction());
    this.store.dispatch(initCommentsStoreAction());
    this.store.dispatch(initPostsStoreAction());
    this.store.dispatch(initUserAction());
    this.store.dispatch(initLikesStoreAction())
  }
}
