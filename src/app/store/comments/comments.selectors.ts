import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CommentState, COMMENTS_FEATURE_KEY } from './comments.reducers';
import {
  CommentMap,
  TableCommentItem,
} from '../../shared/interfaces/comment.interface';
import { mapToArrayWithId } from '../../shared/utils/map-to-array-with-id';
import { authorizationFeatureSelector } from '../auth/auth.selectors';
import { AuthState } from '../auth/auth.reducers';

export const commentsFeatureSelector =
  createFeatureSelector<CommentState>(COMMENTS_FEATURE_KEY);

export const getCommentsSelector = createSelector(
  commentsFeatureSelector,
  (state) => mapToArrayWithId<CommentMap, TableCommentItem>(state.comments)
);

export const getIsInitCommentsSelector = createSelector(
  commentsFeatureSelector,
  (state) => state.isInitComments
);

export const getCommentById = createSelector(
  commentsFeatureSelector,
  (state: CommentState, props: { id: string }) => state.comments[props.id]
);

export const isChangebleCommentByIdSelector = createSelector(
  commentsFeatureSelector,
  authorizationFeatureSelector,
  (commentState: CommentState, authState: AuthState, props: { id: string }) =>
    commentState.comments[props.id].createUserId === authState.user!.uid
);
