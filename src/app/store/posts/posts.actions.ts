import { createAction, props } from '@ngrx/store';
import { Post, PostMap, CreatePost } from '../../shared/interfaces/post.interface';

export const initPostsStoreAction = createAction('[POSTS] init posts');

export const initPostsStoreSuccessAction = createAction(
  '[POSTS] success init posts'
);

export const initPostsStoreFailedAction = createAction(
  '[POSTS] failed init posts'
);

export const getPostsAction = createAction('[POSTS] get posts');

export const getPostsSuccessAction = createAction(
  '[POSTS] get posts success',
  props<{ posts: PostMap }>()
);

export const createPostAction = createAction(
  '[POSTS] create post',
  props<{ post: CreatePost }>()
);

export const createPostSuccessAction = createAction(
  '[POSTS] create post success',
  props<{ id: string; post: Post }>()
);

export const updatePostAction = createAction(
  '[POSTS] update post',
  props<{ id: string; post: Post }>()
);

export const updatePostSuccessAction = createAction(
  '[POSTS] update post success',
  props<{ id: string; post: Post }>()
);

export const deletePostAction = createAction(
  '[POSTS] delete post',
  props<{ id: string }>()
);

export const deletePostSuccessAction = createAction(
  '[POSTS] delete post success',
  props<{ id: string }>()
);

export const clearPostsAction = createAction('[POSTS] clear posts store');


