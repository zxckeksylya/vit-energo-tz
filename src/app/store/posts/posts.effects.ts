import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { concatMap, map, switchMap, take } from 'rxjs';
import { PostsService } from '../../shared/services/posts.service';
import { AppState } from '../app.reducers';
import {
  createPostAction,
  createPostSuccessAction,
  deletePostAction,
  deletePostSuccessAction,
  getPostsAction,
  getPostsSuccessAction,
  initPostsStoreAction,
  initPostsStoreFailedAction,
  initPostsStoreSuccessAction,
  updatePostAction,
  updatePostSuccessAction,
} from './posts.actions';
import { getIsInitPostsSelector } from './posts.selects';

@Injectable()
export class PostEffects {
  public initPostsStore$ = createEffect(() =>
    this.actions$.pipe(
      ofType(initPostsStoreAction),
      switchMap(() =>
        this.store.pipe(
          select(getIsInitPostsSelector),
          take(1),
          map((isInit) =>
            !isInit
              ? initPostsStoreSuccessAction()
              : initPostsStoreFailedAction()
          )
        )
      )
    )
  );

  public initPostsStoreSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(initPostsStoreSuccessAction),
      map(() => getPostsAction())
    )
  );

  public getPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getPostsAction),
      switchMap(() => this.postService.getAll()),
      map((posts) => {
        const newPosts = posts.reduce((c, n) => {
          return { ...c, [n.payload.doc.id]: n.payload.doc.data() };
        }, {});
        return getPostsSuccessAction({ posts: newPosts });
      })
    )
  );

  public createPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createPostAction),
      switchMap((post) => this.postService.createPost(post.post)),
      switchMap((post) => this.postService.getPostById(post.id)),
      map((post) =>
        createPostSuccessAction({ id: post.id, post: post.data()! })
      )
    )
  );

  public updatePost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updatePostAction),
      concatMap((post) =>
        this.postService
          .updatePost(post.id, post.post)
          .pipe(switchMap(() => this.postService.getPostById(post.id)))
      ),
      map((post) =>
        updatePostSuccessAction({ id: post.id, post: post.data()! })
      )
    )
  );

  public deletePost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deletePostAction),
      concatMap((action) =>
        this.postService
          .deletePost(action.id)
          .pipe(map(() => deletePostSuccessAction({ id: action.id })))
      )
    )
  );

  constructor(
    private actions$: Actions,
    private postService: PostsService,
    private store: Store<AppState>
  ) {}
}
