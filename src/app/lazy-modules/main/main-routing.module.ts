import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './page/main-page/main-page.component';
import { RoutingConstants } from '../../shared/constants/routing.constants';

const routes: Routes = [
  {
    path: RoutingConstants.MAIN,
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
      {
        path:RoutingConstants.CONTENT,
        loadChildren:()=>import('../contents/contents.module').then(m=>m.ContentsModule)
      }
    ],
  },
  {
    path:'**',
    redirectTo:RoutingConstants.MAIN
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
