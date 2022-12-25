import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../../../shared/services/posts.service';
import { AppState } from '../../../../store/app.reducers';
import { Store, select } from '@ngrx/store';
import { getPostsSelector } from '../../../../store/posts/posts.selects';
import { getPostsAction } from '../../../../store/posts/posts.actions';
import { initCategoriesStoreAction } from '../../../../store/categories/category.actions';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  constructor(private store: Store<AppState>) {
    this.store.dispatch(getPostsAction());
  }

  public ngOnInit(): void {
    this.initData();
  }

  private initData(): void {
    this.store.dispatch(initCategoriesStoreAction());
  }
}
