import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { authReducer, AuthState, AUTH_FEATURE_KEY } from './auth/auth.reducers';
import {
  CATEGORIES_FEATURE_KEY,
  CategoryState,
  categoryReducer,
} from './categories/category.reducers';
import {
  POSTS_FEATURE_KEY,
  PostsState,
  postsReducer,
} from './posts/posts.reducers';

export interface AppState {
  [AUTH_FEATURE_KEY]: AuthState;
  [POSTS_FEATURE_KEY]: PostsState;
  [CATEGORIES_FEATURE_KEY]: CategoryState;
}

export const reducers: ActionReducerMap<AppState> = {
  [AUTH_FEATURE_KEY]: authReducer,
  [POSTS_FEATURE_KEY]: postsReducer,
  [CATEGORIES_FEATURE_KEY]: categoryReducer,
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? []
  : [];
