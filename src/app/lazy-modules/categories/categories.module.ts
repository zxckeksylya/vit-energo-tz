import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesListPageComponent } from './pages/categories-list-page/categories-list-page.component';
import { CategoriesCreatePageComponent } from './pages/categories-create-page/categories-create-page.component';
import { CategoriesUpdatePageComponent } from './pages/categories-update-page/categories-update-page.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { ButtonModule } from '../../shared/components/button/button.module';
import { ReactiveFormsModule } from '@angular/forms';
import { InputModule } from '../../shared/components/controls/input/input.module';

@NgModule({
  declarations: [
    CategoriesListPageComponent,
    CategoriesCreatePageComponent,
    CategoriesUpdatePageComponent,
    CategoryFormComponent,
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    ButtonModule,
    ReactiveFormsModule,
    InputModule,
  ],
})
export class CategoriesModule {}
