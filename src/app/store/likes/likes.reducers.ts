import { createReducer, on } from '@ngrx/store';
import { deleteInMap } from 'src/app/shared/utils/delit-in-map.util';
import { LikeMap } from '../../shared/interfaces/like.interface';
import {
  clearLikesAction,
  createLikeSuccessAction,
  deleteLikeSuccessAction,
  getLikesSuccessAction,
  updateLikeSuccessAction,
} from './likes.actions';

export const LIKES_FEATURE_KEY = 'likes';

export interface LikesState {
  likes: LikeMap;
  isInitLikes: boolean;
}

export const initialLikesState: LikesState = {
  likes: {},
  isInitLikes: false,
};

export const likesReducer = createReducer(
  initialLikesState,

  on(getLikesSuccessAction, (state, action) => ({
    ...state,
    isInitLikes: true,
    likes: action.likes,
  })),

  on(createLikeSuccessAction, (state, action) => ({
    ...state,
    likes: {
      [action.id]: action.like,
      ...state.likes,
    },
  })),

  on(updateLikeSuccessAction, (state, action) => ({
    ...state,
    categories: {
      ...state.likes,
      [action.id]: action.like,
    },
  })),

  on(deleteLikeSuccessAction, (state, action) => ({
    ...state,
    categories: deleteInMap<LikeMap>(state.likes, action.id),
  })),

  on(clearLikesAction, () => ({
    ...initialLikesState,
  }))
);
