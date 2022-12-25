import { IdItem } from './id-item.interface';
export interface Post {
  createUserId: string;
  title: string;
  content: string;
  categories:string[];
  likesIds:string[];
  comments:string[];
}

export interface CreatePost {
  title: string;
  content: string;
  categories: string[];
}

export interface PostMap {
  [id: string]: Post;
}

export interface TablePostItem extends Post, IdItem {}
