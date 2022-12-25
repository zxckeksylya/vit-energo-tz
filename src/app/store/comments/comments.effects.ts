import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { concatMap, map, switchMap, take } from 'rxjs';
import { CommentsService } from '../../shared/services/comments.service';
import { AppState } from '../app.reducers';
import { userSelector } from '../auth/auth.selectors';
import {
  createCommentAction,
  createCommentSuccessAction,
  deleteCommentAction,
  deleteCommentSuccessAction,
  getCommentsAction,
  getCommentsSuccessAction,
  initCommentsStoreAction,
  initCommentsStoreFailedAction,
  initCommentsStoreSuccessAction,
  updateCommentAction,
  updateCommentSuccessAction,
} from './comments.action';
import { getIsInitCommentsSelector } from './comments.selectors';

@Injectable()
export class CommentEffect {
  public initCommentsStore$ = createEffect(() =>
    this.actions$.pipe(
      ofType(initCommentsStoreAction),
      switchMap(() =>
        this.store.pipe(
          select(getIsInitCommentsSelector),
          take(1),
          map((isInit) =>
            !isInit
              ? initCommentsStoreSuccessAction()
              : initCommentsStoreFailedAction()
          )
        )
      )
    )
  );

  public initCommentsStoreSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(initCommentsStoreSuccessAction),
      map(() => getCommentsAction())
    )
  );

  public getComments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getCommentsAction),
      switchMap(() => this.commentsService.getAll()),
      map((comments) => {
        const newComments = comments.reduce((c, n) => {
          return { ...c, [n.payload.doc.id]: n.payload.doc.data() };
        }, {});
        return getCommentsSuccessAction({ comments: newComments });
      })
    )
  );

  public createComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createCommentAction),
      switchMap((action) =>
        this.store.pipe(
          select(userSelector),
          concatMap((user) =>
            this.commentsService
              .createComment({ ...action.comment, createUserId: user!.uid })
              .pipe(
                concatMap((comment) =>
                  this.commentsService.getCommentById(comment.id)
                ),
                map((item) =>
                  createCommentSuccessAction({
                    postId: action.postId,
                    id: item.id,
                    comment: item.data()!,
                  })
                )
              )
          )
        )
      )
    )
  );

  public updateComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateCommentAction),
      concatMap((comment) =>
        this.commentsService
          .updateComment(comment.id, comment.comment)
          .pipe(
            switchMap(() => this.commentsService.getCommentById(comment.id))
          )
      ),
      map((comment) =>
        updateCommentSuccessAction({
          id: comment.id,
          comment: comment.data()!,
        })
      )
    )
  );

  public deleteComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteCommentAction),
      concatMap((action) =>
        this.commentsService
          .deleteComment(action.id)
          .pipe(map(() => deleteCommentSuccessAction({ id: action.id })))
      )
    )
  );

  constructor(
    private actions$: Actions,
    private commentsService: CommentsService,
    private store: Store<AppState>
  ) {}
}
