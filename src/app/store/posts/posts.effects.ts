import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { concatMap, map, switchMap, take } from 'rxjs';
import { Post } from '../../shared/interfaces/post.interface';
import { PostsService } from '../../shared/services/posts.service';
import { AppState } from '../app.reducers';
import { userSelector } from '../auth/auth.selectors';
import {
  changeLikePost,
  changeLikePostSuccess,
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
import { getIsInitPostsSelector, getPostByIdSelector } from './posts.selects';
import { createCommentSuccessAction } from '../comments/comments.action';

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
      switchMap((post) =>
        this.store.pipe(
          select(userSelector),
          map((user) => ({
            createUserId: user!.uid,
            ...post.post,
            likesIds: [],
            comments: [],
          }))
        )
      ),
      switchMap((post) => this.postService.createPost(post)),
      switchMap((post) => this.postService.getPostById(post.id)),
      map((post) =>
        createPostSuccessAction({ id: post.id, post: post.data()! })
      )
    )
  );

  public updatePost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updatePostAction, changeLikePostSuccess),
      concatMap((post) =>
        this.postService
          .updatePost(post.id, post.post)
          .pipe(switchMap(() => this.postService.getPostById(post.id)))
      ),
      map((post) =>
        updatePostSuccessAction({
          id: post.id,
          post: post.data()!,
        })
      )
    )
  );

  public addComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createCommentSuccessAction),
      concatMap((action) =>
        this.store.pipe(
          take(1),
          select((state) => getPostByIdSelector(state, { id: action.postId })),
          map((post) => {
            const newCommentsArr = [...post.comments];
            newCommentsArr.push(action.id);
            return updatePostAction({
              id: action.postId,
              post: { ...post, comments: newCommentsArr },
            });
          })
        )
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

  public changePostLike$ = createEffect(() =>
    this.actions$.pipe(
      ofType(changeLikePost),
      switchMap((action) =>
        this.store.pipe(
          select((state) => getPostByIdSelector(state, { id: action.id })),
          concatMap((post) =>
            this.store.pipe(
              select(userSelector),
              map((user) => {
                if (post.likesIds.includes(user!.uid)) {
                  const indexOfLike = post.likesIds.indexOf(user!.uid);
                  const newLikesArr = [...post.likesIds];
                  newLikesArr.splice(indexOfLike, 1);
                  const newPost: Post = {
                    ...post,
                    likesIds: newLikesArr,
                  };
                  return changeLikePostSuccess({
                    id: action.id,
                    post: newPost,
                  });
                } else {
                  const newLikesArr = [...post.likesIds];
                  newLikesArr.push(user!.uid);
                  const newPost: Post = {
                    ...post,
                    likesIds: newLikesArr,
                  };
                  return changeLikePostSuccess({
                    id: action.id,
                    post: newPost,
                  });
                }
              })
            )
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private postService: PostsService,
    private store: Store<AppState>
  ) {}
}
