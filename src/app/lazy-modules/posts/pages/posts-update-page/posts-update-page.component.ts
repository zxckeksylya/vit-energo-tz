import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post, CreatePost } from '../../../../shared/interfaces/post.interface';
import { Subject, takeUntil, switchMap, take } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../../store/app.reducers';
import { Router, ActivatedRoute } from '@angular/router';
import { getPostByIdSelector } from '../../../../store/posts/posts.selects';
import { updatePostAction } from '../../../../store/posts/posts.actions';
import { RoutingConstants } from '../../../../shared/constants/routing.constants';

@Component({
  selector: 'app-posts-update-page',
  templateUrl: './posts-update-page.component.html',
  styleUrls: ['./posts-update-page.component.scss']
})
export class PostsUpdatePageComponent implements OnInit, OnDestroy  {
  public post!: Post;
  public id!: string;

  private destroy$ = new Subject<void>();

  constructor(
    private store: Store<AppState>,
    private route: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(
        takeUntil(this.destroy$),
        switchMap((params) => params.getAll('id')),
        take(1),
        switchMap((id) => {
          this.id = id;
          return this.store.pipe(
            select((state) => getPostByIdSelector(state, { id }))
          );
        })
      )
      .subscribe((post) => (this.post = post));
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public updatePost(post: CreatePost): void {
    this.store.dispatch(updatePostAction({ id: this.id, post:{...this.post, ...post} }));
    this.route.navigate([RoutingConstants.POSTS]);
  }
}
