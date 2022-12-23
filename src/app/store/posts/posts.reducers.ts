import { createReducer, on } from '@ngrx/store';
import { PostMap } from '../../shared/interfaces/post.interface';
import { deleteInMap } from '../../shared/utils/delit-in-map.util';
import {
  clearPostsAction,
  createPostSuccessAction,
  deletePostSuccessAction,
  getPostsSuccessAction,
  updatePostSuccessAction,
} from './posts.actions';

export const POSTS_FEATURE_KEY = 'posts';

export interface PostsState {
  posts: PostMap;
  isInitPosts: boolean;
}

export const initialPostsState: PostsState = {
  posts: {},
  isInitPosts: false,
};

export const postsReducer = createReducer(
  initialPostsState,

  on(getPostsSuccessAction, (state, action) => ({
    ...state,
    isInitPosts: true,
    posts: action.posts,
  })),

  on(createPostSuccessAction, (state, action) => ({
    ...state,
    posts: {
      [action.id]: action.post,
      ...state.posts,
    },
  })),

  on(updatePostSuccessAction, (state, action) => ({
    ...state,
    posts: {
      ...state.posts,
      [action.id]: action.post,
    },
  })),

  on(deletePostSuccessAction, (state, action) => ({
    ...state,
    posts: deleteInMap<PostMap>(state.posts, action.id),
  })),

  on(clearPostsAction, () => ({
    ...initialPostsState,
  }))
);
