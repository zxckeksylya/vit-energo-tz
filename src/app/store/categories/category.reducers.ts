import { createReducer, on } from '@ngrx/store';
import { CategoryMap } from '../../shared/interfaces/category.interface';
import { deleteInMap } from '../../shared/utils/delit-in-map.util';
import {
  clearCategoriesAction,
  createCategorySuccessAction,
  deleteCategorySuccessAction,
  getCategoriesSuccessAction,
  updateCategorySuccessAction
} from './category.actions';

export const CATEGORIES_FEATURE_KEY = 'categories';

export interface CategoryState {
  categories: CategoryMap;
  isInitCategories: boolean;
}

export const initialCategoriesState: CategoryState = {
  categories: {},
  isInitCategories: false,
};

export const categoryReducer = createReducer(
  initialCategoriesState,

  on(getCategoriesSuccessAction, (state, action) => ({
    ...state,
    isInitCategories: true,
    categories: action.categories,
  })),

  on(createCategorySuccessAction, (state, action) => ({
    ...state,
    categories: {
      [action.id]: action.category,
      ...state.categories,
    },
  })),

  on(updateCategorySuccessAction, (state, action) => ({
    ...state,
    categories: {
      ...state.categories,
      [action.id]: action.category,
    },
  })),

  on(deleteCategorySuccessAction, (state, action) => ({
    ...state,
    categories: deleteInMap<CategoryMap>(state.categories, action.id),
  })),

  on(clearCategoriesAction, () => ({
    ...initialCategoriesState,
  }))
);
