import { createFeatureSelector, createSelector, props } from '@ngrx/store';
import { PostsState, POSTS_FEATURE_KEY } from './posts.reducers';
import { authorizationFeatureSelector } from '../auth/auth.selectors';
import { mapToArrayWithId } from '../../shared/utils/map-to-array-with-id';
import { PostMap, TablePostItem } from '../../shared/interfaces/post.interface';
import { state } from '@angular/animations';
import { AuthState } from '../auth/auth.reducers';
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
      (post) => post.createUserId === authState.user!.uid
    )
);

export const getPostByIdSelector = createSelector(
  postsFeatureSelector,
  (state: PostsState, props: { id: string }) => state.posts[props.id]
);

export const getPostsByCategoriesIdSelector = createSelector(
  postsFeatureSelector,
  (state: PostsState, props: string[] ) => {
    const postsArray = mapToArrayWithId<PostMap, TablePostItem>(state.posts);
    if (props.length === 0) {
      return postsArray;
    }else{
      return postsArray.filter((x) => {
        for (let i = 0; i < props.length; i++) {
          if (x.categories.includes(props[i])) {
            return true;
          }
        }
        return false;
      });
    }
  }
);

export const getLikeStatusByPostId = createSelector(
  postsFeatureSelector,
  authorizationFeatureSelector,
  (postsState:PostsState,authState:AuthState,props:string)=>{
    const post = postsState.posts[props];
    if(post.likesIds.includes(authState.user!.uid)){
      return true;
    }else{
      return false
    }
  }
)
