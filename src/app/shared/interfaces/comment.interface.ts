import { IdItem } from './id-item.interface';

export interface Comment{
    content:string;
    createUserId:string;
}

export interface CommentMap{
    [id:string]:Comment;
}

export interface CreateComment{
    content:string;
}

export interface TableCommentItem extends Comment,IdItem{}