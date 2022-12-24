import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './page/main-page/main-page.component';
import { RoutingConstants } from '../../shared/constants/routing.constants';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    children: [
      {
        path: RoutingConstants.CATEGORIES,
        loadChildren: () =>
          import('../categories/categories.module').then(
            (m) => m.CategoriesModule
          ),
      },
      {
        path: RoutingConstants.POSTS,
        loadChildren: () =>
          import('../posts/posts.module').then((m) => m.PostsModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
