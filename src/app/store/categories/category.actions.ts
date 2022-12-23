import { createAction, props } from '@ngrx/store';
import {
  Category,
  CategoryMap,
} from '../../shared/interfaces/category.interface';

export const initCategoriesStoreAction = createAction(
  '[CATEGORIES] init categories'
);

export const initCategoriesStoreSuccessAction = createAction(
  '[CATEGORIES] success init categories'
);

export const initCategoriesStoreFailedAction = createAction(
  '[CATEGORIES] failed init categories'
);

export const getCategoriesAction = createAction('[CATEGORIES] get categories');

export const getCategoriesSuccessAction = createAction(
  '[CATEGORIES] get categories success',
  props<{ categories: CategoryMap }>()
);

export const createCategoryAction = createAction(
  '[CATEGORIES] create category',
  props<{ category: Category }>()
);

export const createCategorySuccessAction = createAction(
  '[CATEGORIES] create category success',
  props<{ id: string; category: Category }>()
);

export const updateCategoryAction = createAction(
  '[CATEGORIES] update category',
  props<{ id: string; category: Category }>()
);

export const updateCategorySuccessAction = createAction(
  '[CATEGORIES] update category success',
  props<{ id: string; category: Category }>()
);

export const deleteCategoryAction = createAction(
  '[CATEGORIES] delete category',
  props<{ id: string }>()
);

export const deleteCategorySuccessAction = createAction(
  '[CATEGORIES] delete category success',
  props<{ id: string }>()
);

export const clearCategoriesAction = createAction(
  '[CATEGORIES] clear categories store'
);
