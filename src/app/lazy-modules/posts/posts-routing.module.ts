import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutingConstants } from 'src/app/shared/constants/routing.constants';
import { PostsCreatePageComponent } from './pages/posts-create-page/posts-create-page.component';
import { PostsListPageComponent } from './pages/posts-list-page/posts-list-page.component';
import { PostsUpdatePageComponent } from './pages/posts-update-page/posts-update-page.component';

const routes: Routes = [
  {
    path: '',
    component: PostsListPageComponent,
  },
  {
    path: RoutingConstants.CREATE,
    component: PostsCreatePageComponent,
  },
  {
    path: `${RoutingConstants.UPDATE}/:id`,
    component: PostsUpdatePageComponent,
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
export class PostsRoutingModule {}
