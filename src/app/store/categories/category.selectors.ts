import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CATEGORIES_FEATURE_KEY, CategoryState } from './category.reducers';
import { mapToArrayWithId } from '../../shared/utils/map-to-array-with-id';
import {
  CategoryMap,
  TableCategoryItem,
} from '../../shared/interfaces/category.interface';
export const categoriesFeatureSelector = createFeatureSelector<CategoryState>(
  CATEGORIES_FEATURE_KEY
);

export const getCategoriesSelector = createSelector(
  categoriesFeatureSelector,
  (state) => mapToArrayWithId<CategoryMap, TableCategoryItem>(state.categories)
);

export const getIsInitCategoriesSelector = createSelector(
  categoriesFeatureSelector,
  (state) => state.isInitCategories
);

export const getCategoryByIdSelector = createSelector(
  categoriesFeatureSelector,
  (state: CategoryState, props: { id: string }) => state.categories[props.id]
);

export const getCategoriesByIdsSelector = createSelector(
  categoriesFeatureSelector,
  (state: CategoryState, props: string[]) =>
  mapToArrayWithId<CategoryMap, TableCategoryItem>(state.categories).filter((x)=>{
    for(let i =0;i<props.length;i++){
      if(props[i]===x.id){
        return true
      }
    }
    return false;
  })
);
