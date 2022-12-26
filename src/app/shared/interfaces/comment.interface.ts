import { IdItem } from './id-item.interface';
import { MapId } from './map.inteface';

export interface Comment{
    content:string;
    createUserId:string;
}

export interface CommentMap extends MapId<Comment>{}

export interface CreateComment{
    content:string;
}

export interface TableCommentItem extends Comment,IdItem{}