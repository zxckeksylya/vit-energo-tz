import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { concatMap, map, switchMap, take } from 'rxjs';
import { LikeService } from '../../shared/services/likes.service';
import { AppState } from '../app.reducers';
import { userSelector } from '../auth/auth.selectors';
import {
  changeLikeByIdAction,
  changeLikeByIdSuccessAction,
  createLikeAction,
  createLikeSuccessAction,
  deleteLikeAction,
  deleteLikeSuccessAction,
  getLikesAction,
  getLikesSuccessAction,
  initLikesStoreAction,
  initLikesStoreFailedAction,
  initLikesStoreSuccessAction,
  updateLikeAction,
  updateLikeSuccessAction,
} from './likes.actions';
import { getIsInitLikesSelector, getLikeByIdSelector } from './likes.selectors';

@Injectable()
export class LikesEffect {
  public initLikesStore$ = createEffect(() =>
    this.actions$.pipe(
      ofType(initLikesStoreAction),
      switchMap(() =>
        this.store.pipe(
          select(getIsInitLikesSelector),
          take(1),
          map((isInit) =>
            !isInit
              ? initLikesStoreSuccessAction()
              : initLikesStoreFailedAction()
          )
        )
      )
    )
  );

  public initLikesStoreSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(initLikesStoreSuccessAction),
      map(() => getLikesAction())
    )
  );

  public getLikes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getLikesAction),
      switchMap(() => this.likesService.getAll()),
      map((likes) => {
        const newLikes = likes.reduce((c, n) => {
          return { ...c, [n.payload.doc.id]: n.payload.doc.data() };
        }, {});
        return getLikesSuccessAction({ likes: newLikes });
      })
    )
  );

  public createLike$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createLikeAction),
      switchMap((like) => this.likesService.createLike(like.like)),
      switchMap((like) => this.likesService.getLikeById(like.id)),
      map((item) =>
        createLikeSuccessAction({ id: item.id, like: item.data()! })
      )
    )
  );

  public updateLike$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateLikeAction, changeLikeByIdSuccessAction),
      concatMap((like) =>
        this.likesService
          .updateLike(like.id, like.like)
          .pipe(switchMap(() => this.likesService.getLikeById(like.id)))
      ),
      map((like) =>
        updateLikeSuccessAction({
          id: like.id,
          like: like.data()!,
        })
      )
    )
  );

  public deleteLike$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteLikeAction),
      concatMap((action) =>
        this.likesService
          .deleteLike(action.id)
          .pipe(map(() => deleteLikeSuccessAction({ id: action.id })))
      )
    )
  );

  public changeLike$ = createEffect(() =>
    this.actions$.pipe(
      ofType(changeLikeByIdAction),
      switchMap((action) =>
        this.store
          .select((state) => getLikeByIdSelector(state, { id: action.id }))
          .pipe(
            concatMap((like) =>
              this.store.pipe(select(userSelector)).pipe(
                map((user) => {
                  const newLikes = [...like.likes];
                  if (like.likes.includes(user!.uid)) {
                    const index = newLikes.indexOf(user!.uid);
                    newLikes.splice(index, 1);
                  } else {
                    newLikes.push(user!.uid);
                  }
                  return changeLikeByIdSuccessAction({
                    id: action.id,
                    like: { likes: newLikes },
                  });
                })
              )
            )
          )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private likesService: LikeService,
    private store: Store<AppState>
  ) {}
}
