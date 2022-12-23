import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { concatMap, map, switchMap, take } from 'rxjs';
import { CategoryService } from '../../shared/services/category.service';
import { AppState } from '../app.reducers';
import {
  createCategoryAction,
  createCategorySuccessAction,
  deleteCategoryAction,
  deleteCategorySuccessAction,
  getCategoriesAction,
  getCategoriesSuccessAction,
  initCategoriesStoreAction,
  initCategoriesStoreFailedAction,
  initCategoriesStoreSuccessAction,
  updateCategoryAction,
  updateCategorySuccessAction,
} from './category.actions';
import { getIsInitCategoriesSelector } from './category.selectors';

@Injectable()
export class CategoryEffect {
  public initCategoriesStore$ = createEffect(() =>
    this.actions$.pipe(
      ofType(initCategoriesStoreAction),
      switchMap(() =>
        this.store.pipe(
          select(getIsInitCategoriesSelector),
          take(1),
          map((isInit) =>
            !isInit
              ? initCategoriesStoreSuccessAction()
              : initCategoriesStoreFailedAction()
          )
        )
      )
    )
  );

  public initCategoriesStoreSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(initCategoriesStoreSuccessAction),
      map(() => getCategoriesAction())
    )
  );

  public getCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getCategoriesAction),
      switchMap(() => this.categoriesService.getAll()),
      map((categories) => {
        const newCategories = categories.reduce((c, n) => {
          return { ...c, [n.payload.doc.id]: n.payload.doc.data() };
        }, {});
        return getCategoriesSuccessAction({ categories: newCategories });
      })
    )
  );

  public createCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createCategoryAction),
      switchMap((category) =>
        this.categoriesService.createCategory(category.category)
      ),
      switchMap((category) =>
        this.categoriesService.getCategoryById(category.id)
      ),
      map((item) =>
        createCategorySuccessAction({ id: item.id, category: item.data()! })
      )
    )
  );

  public updateCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateCategoryAction),
      concatMap((category) =>
        this.categoriesService
          .updateCategory(category.id, category.category)
          .pipe(
            switchMap(() => this.categoriesService.getCategoryById(category.id))
          )
      ),
      map((category) =>
        updateCategorySuccessAction({
          id: category.id,
          category: category.data()!,
        })
      )
    )
  );

  public deleteCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteCategoryAction),
      concatMap((action) =>
        this.categoriesService
          .deleteCategory(action.id)
          .pipe(map(() => deleteCategorySuccessAction({ id: action.id })))
      )
    )
  );

  constructor(
    private actions$: Actions,
    private categoriesService: CategoryService,
    private store: Store<AppState>
  ) {}
}
