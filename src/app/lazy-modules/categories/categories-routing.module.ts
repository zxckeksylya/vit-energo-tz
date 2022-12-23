import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutingConstants } from 'src/app/shared/constants/routing.constants';
import { CategoriesCreatePageComponent } from './pages/categories-create-page/categories-create-page.component';
import { CategoriesListPageComponent } from './pages/categories-list-page/categories-list-page.component';
import { CategoriesUpdatePageComponent } from './pages/categories-update-page/categories-update-page.component';

const routes: Routes = [
  {
    path: '',
    component: CategoriesListPageComponent,
  },
  {
    path: RoutingConstants.CREATE,
    component: CategoriesCreatePageComponent,
  },
  {
    path: `${RoutingConstants.UPDATE}/:id`,
    component: CategoriesUpdatePageComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriesRoutingModule {}
