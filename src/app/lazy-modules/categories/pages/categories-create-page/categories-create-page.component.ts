import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Category } from 'src/app/shared/interfaces/category.interface';
import { AppState } from 'src/app/store/app.reducers';
import { RoutingConstants } from '../../../../shared/constants/routing.constants';
import { createCategoryAction } from '../../../../store/categories/category.actions';

@Component({
  selector: 'app-categories-create-page',
  templateUrl: './categories-create-page.component.html',
  styleUrls: ['./categories-create-page.component.scss'],
})
export class CategoriesCreatePageComponent {
  constructor(private store: Store<AppState>, private route: Router) {}

  public createCategory(category: Category): void {
    this.store.dispatch(createCategoryAction({ category }));
    this.route.navigate([RoutingConstants.CATEGORIES]);
  }
}
