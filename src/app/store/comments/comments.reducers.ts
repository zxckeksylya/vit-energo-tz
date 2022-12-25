import { createReducer, on } from '@ngrx/store';
import { CommentMap } from '../../shared/interfaces/comment.interface';
import { deleteInMap } from '../../shared/utils/delit-in-map.util';
import {
  clearCommentsAction,
  createCommentSuccessAction,
  deleteCommentSuccessAction,
  getCommentsSuccessAction,
  updateCommentSuccessAction,
} from './comments.action';

export const COMMENTS_FEATURE_KEY = 'comments';

export interface CommentState {
  comments: CommentMap;
  isInitComments: boolean;
}

export const initialCommentsState: CommentState = {
  comments: {},
  isInitComments: false,
};

export const commentReducer = createReducer(
  initialCommentsState,

  on(getCommentsSuccessAction, (state, action) => ({
    ...state,
    isInitComments: true,
    comments: action.comments,
  })),

  on(createCommentSuccessAction, (state, action) => ({
    ...state,
    comments: {
      [action.id]: action.comment,
      ...state.comments,
    },
  })),

  on(updateCommentSuccessAction, (state, action) => ({
    ...state,
    comments: {
      ...state.comments,
      [action.id]: action.comment,
    },
  })),

  on(deleteCommentSuccessAction, (state, action) => ({
    ...state,
    comments: deleteInMap<CommentMap>(state.comments, action.id),
  })),

  on(clearCommentsAction, () => ({
    ...initialCommentsState,
  }))
);
