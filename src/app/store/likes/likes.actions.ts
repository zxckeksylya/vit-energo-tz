import { createAction, props } from '@ngrx/store';
import { Like, LikeMap } from '../../shared/interfaces/like.interface';

export const initLikesStoreAction = createAction('[LIKES] init likes');

export const initLikesStoreSuccessAction = createAction(
  '[LIKES] success init likes'
);

export const initLikesStoreFailedAction = createAction(
  '[LIKES] failed init likes'
);

export const getLikesAction = createAction('[LIKES] get likes');

export const getLikesSuccessAction = createAction(
  '[LIKES] get likes success',
  props<{ likes: LikeMap }>()
);

export const createLikeAction = createAction(
  '[LIKES] create like',
  props<{ like: Like }>()
);

export const createLikeSuccessAction = createAction(
  '[LIKES] create like success',
  props<{ id: string; like: Like }>()
);

export const updateLikeAction = createAction(
  '[LIKES] update like',
  props<{ id: string; like: Like }>()
);

export const updateLikeSuccessAction = createAction(
  '[LIKES] update like success',
  props<{ id: string; like: Like }>()
);

export const deleteLikeAction = createAction(
  '[LIKES] delete like',
  props<{ id: string }>()
);

export const deleteLikeSuccessAction = createAction(
  '[LIKES] delete like success',
  props<{ id: string }>()
);

export const clearLikesAction = createAction('[LIKES] clear likes store');

export const changeLikeByIdAction = createAction(
  '[LIKES] change like status',
  props<{ id: string }>()
);

export const changeLikeByIdSuccessAction = createAction(
  '[LIKES] change like status success',
  props<{ id: string; like: Like }>()
);
