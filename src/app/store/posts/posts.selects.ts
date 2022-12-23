import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PostsState, POSTS_FEATURE_KEY } from './posts.reducers';
import { authorizationFeatureSelector } from '../auth/auth.selectors';
import { mapToArrayWithId } from '../../shared/utils/map-to-array-with-id';
import { PostMap, TablePostItem } from '../../shared/interfaces/post.interface';
export const postsFeatureSelector =
  createFeatureSelector<PostsState>(POSTS_FEATURE_KEY);

export const getPostsSelector = createSelector(postsFeatureSelector, (state) =>
  mapToArrayWithId<PostMap, TablePostItem>(state.posts)
);

export const getIsInitPostsSelector = createSelector(
  postsFeatureSelector,
  (state) => state.isInitPosts
);

export const getPostsByCurrentUserSelector = createSelector(
  postsFeatureSelector,
  authorizationFeatureSelector,
  (postState, authState) =>
    mapToArrayWithId<PostMap, TablePostItem>(postState.posts).filter(
      (post) => post.createUserId === authState.user?.uid
    )
);
