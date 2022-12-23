import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CATEGORIES_FEATURE_KEY, CategoryState } from './category.reducers';
export const categoriesFeatureSelector = createFeatureSelector<CategoryState>(
  CATEGORIES_FEATURE_KEY
);

export const getCategoriesSelector = createSelector(
  categoriesFeatureSelector,
  (state) =>
    Object.keys(state.categories).map((id) => ({ ...state.categories[id], id }))
);

export const getIsInitCategoriesSelector = createSelector(
  categoriesFeatureSelector,
  (state) => state.isInitCategories
);

export const getCategoryByIdSelector = createSelector(
  categoriesFeatureSelector,
  (state: CategoryState, props: { id: string }) => state.categories[props.id]
);
