import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { TablePostItem } from '../../../../shared/interfaces/post.interface';
import { AppState } from '../../../../store/app.reducers';
import { deletePostAction } from '../../../../store/posts/posts.actions';
import { getPostsByCurrentUserSelector } from '../../../../store/posts/posts.selects';
import { RoutingConstants } from '../../../../shared/constants/routing.constants';

@Component({
  selector: 'app-posts-list-page',
  templateUrl: './posts-list-page.component.html',
  styleUrls: ['./posts-list-page.component.scss'],
})
export class PostsListPageComponent implements OnInit, OnDestroy {
  public posts: TablePostItem[] = [];

  private destroy$ = new Subject<void>();

  constructor(private store: Store<AppState>, private route: Router) {}

  public ngOnInit(): void {
    this.initData();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public createPost(): void {
    this.route.navigate([RoutingConstants.POSTS, RoutingConstants.CREATE]);
  }

  public deletePost(id: string): void {
    this.store.dispatch(deletePostAction({ id }));
  }

  public updatePost(id: string): void {
    this.route.navigate([RoutingConstants.POSTS, RoutingConstants.UPDATE, id]);
  }

  private initData(): void {
    this.store
      .pipe(select(getPostsByCurrentUserSelector), takeUntil(this.destroy$))
      .subscribe((posts) => (this.posts = posts));
  }
}
