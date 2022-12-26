import { IdItem } from './id-item.interface';
import { MapId } from './map.inteface';
export interface Post {
  createUserId: string;
  title: string;
  content: string;
  categories:string[];
  likesIds:string;
  comments:string[];
  imgUrl:string;
}

export interface CreatePost {
  title: string;
  content: string;
  categories: string[];
  imgUrl:string;
}

export interface PostMap extends MapId<Post>{}

export interface TablePostItem extends Post, IdItem {}
