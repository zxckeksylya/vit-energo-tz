import { IdItem } from './id-item.interface';
export interface Category {
  name: string;
}

export interface CategoryMap {
  [id: string]: Category;
}

export interface TableCategoryItem extends Category, IdItem {}
