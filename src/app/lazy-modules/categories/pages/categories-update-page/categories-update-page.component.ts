import { Component, OnInit, OnDestroy } from '@angular/core';
import { Category } from '../../../../shared/interfaces/category.interface';
import { Subject, takeUntil, switchMap, take, concatMap } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../../store/app.reducers';
import { ActivatedRoute, Router } from '@angular/router';
import { updateCategoryAction } from '../../../../store/categories/category.actions';
import { getCategoryByIdSelector } from '../../../../store/categories/category.selectors';
import { RoutingConstants } from '../../../../shared/constants/routing.constants';

@Component({
  selector: 'app-categories-update-page',
  templateUrl: './categories-update-page.component.html',
  styleUrls: ['./categories-update-page.component.scss'],
})
export class CategoriesUpdatePageComponent implements OnInit, OnDestroy {
  public category!: Category;
  public id!: string;

  private destroy$ = new Subject<void>();

  constructor(
    private store: Store<AppState>,
    private route: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(
        takeUntil(this.destroy$),
        switchMap((params) => params.getAll('id')),
        take(1),
        switchMap((id) => {
          this.id = id;
          return this.store.pipe(
            select((state) => getCategoryByIdSelector(state, { id }))
          );
        })
      )
      .subscribe((category) => (this.category = category));
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public updateCategory(category: Category): void {
    this.store.dispatch(updateCategoryAction({ id: this.id, category }));
    this.route.navigate([RoutingConstants.CATEGORIES]);
  }
}
