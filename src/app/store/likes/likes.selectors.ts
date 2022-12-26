import { createFeatureSelector, createSelector } from '@ngrx/store';
import { mapToArrayWithId } from 'src/app/shared/utils/map-to-array-with-id';
import { LikesState, LIKES_FEATURE_KEY } from './likes.reducers';
import { LikeMap, TableLikeItem } from '../../shared/interfaces/like.interface';
import { state } from '@angular/animations';
import { authorizationFeatureSelector } from '../auth/auth.selectors';
import { AuthState } from '../auth/auth.reducers';
export const likesFeatureSelector = createFeatureSelector<LikesState>(
    LIKES_FEATURE_KEY
  );
  
  export const getLikesSelector = createSelector(
    likesFeatureSelector,
    (state) => mapToArrayWithId<LikeMap, TableLikeItem>(state.likes)
  );
  
  export const getIsInitLikesSelector = createSelector(
    likesFeatureSelector,
    (state) => state.isInitLikes
  );
  
  export const getLikeByIdSelector = createSelector(
    likesFeatureSelector,
    (state: LikesState, props: { id: string }) => state.likes[props.id]
  );

  export const lustCreatedLikeIdSelector = createSelector(
    likesFeatureSelector,
    (state)=>Object.keys(state.likes)[0]
  )
  export const getLikeStatusByLikeId = createSelector(
    likesFeatureSelector,
    authorizationFeatureSelector,
    (likeState:LikesState,authState:AuthState,props:{id:string})=>{
        const like = likeState.likes[props.id];
        return like.likes.includes(authState.user!.uid)
    }
  )
  