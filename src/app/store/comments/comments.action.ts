import { createAction, props } from '@ngrx/store';
import { Comment, CommentMap, CreateComment } from '../../shared/interfaces/comment.interface';

export const initCommentsStoreAction = createAction('[COMMENTS] init comments');

export const initCommentsStoreSuccessAction = createAction(
  '[COMMENTS] success init comments'
);

export const initCommentsStoreFailedAction = createAction(
  '[COMMENTS] failed init comments'
);

export const getCommentsAction = createAction('[COMMENTS] get comments');

export const getCommentsSuccessAction = createAction(
  '[COMMENTS] get comments success',
  props<{ comments: CommentMap }>()
);

export const createCommentAction = createAction(
  '[COMMENTS] create comment',
  props<{ postId:string,comment: CreateComment }>()
);

export const createCommentSuccessAction = createAction(
  '[COMMENTS] create comment success',
  props<{postId:string, id: string; comment: Comment }>()
);

export const updateCommentAction = createAction(
  '[COMMENTS] update comment',
  props<{ id: string; comment: Comment }>()
);

export const updateCommentSuccessAction = createAction(
  '[COMMENTS] update comment success',
  props<{ id: string; comment: Comment }>()
);

export const deleteCommentAction = createAction(
  '[COMMENTS] delete comment',
  props<{ id: string }>()
);

export const deleteCommentSuccessAction = createAction(
  '[COMMENTS] delete comment success',
  props<{ id: string }>()
);

export const clearCommentsAction = createAction(
  '[COMMENTS] clear comments store'
);
