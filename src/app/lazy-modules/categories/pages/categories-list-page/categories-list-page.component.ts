import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { TableCategoryItem } from 'src/app/shared/interfaces/category.interface';
import { RoutingConstants } from '../../../../shared/constants/routing.constants';
import { AppState } from '../../../../store/app.reducers';
import { deleteCategoryAction } from '../../../../store/categories/category.actions';
import { getCategoriesSelector } from '../../../../store/categories/category.selectors';

@Component({
  selector: 'app-categories-list-page',
  templateUrl: './categories-list-page.component.html',
  styleUrls: ['./categories-list-page.component.scss'],
})
export class CategoriesListPageComponent implements OnInit, OnDestroy {
  public categories: TableCategoryItem[] = [];

  private destroy$ = new Subject<void>();

  constructor(private store: Store<AppState>, private route: Router) {}

  public ngOnInit(): void {
    this.initData();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public createCategory(): void {
    this.route.navigate([RoutingConstants.CATEGORIES, RoutingConstants.CREATE]);
  }

  public updateCategory(id: string): void {
    this.route.navigate([
      RoutingConstants.CATEGORIES,
      RoutingConstants.UPDATE,
      id,
    ]);
  }

  public deleteCategory(id: string): void {
    this.store.dispatch(deleteCategoryAction({ id }));
  }

  private initData(): void {
    this.store
      .pipe(select(getCategoriesSelector), takeUntil(this.destroy$))
      .subscribe((categories) => {
        this.categories = categories;
      });
  }
}
