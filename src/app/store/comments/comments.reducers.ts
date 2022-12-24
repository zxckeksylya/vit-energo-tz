import { CommentMap } from '../../shared/interfaces/comment.interface';
import { createReducer } from '@ngrx/store';
export const COMMENTS_FEATURE_KEY = 'comments';

export interface CommentState{
    comments:CommentMap;
    isInitComments:boolean;
}

export const initialCommentsState:CommentState = {
    comments:{},
    isInitComments:false,
}

export const commentReducer = createReducer(
    initialCommentsState,

    
)
