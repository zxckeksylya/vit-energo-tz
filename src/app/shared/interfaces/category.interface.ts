import { IdItem } from './id-item.interface';
import { MapId } from './map.inteface';

export interface Category {
  name: string;
}

export interface CategoryMap extends MapId<Category> {}

export interface TableCategoryItem extends Category, IdItem {}
