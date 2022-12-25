import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutingConstants } from './shared/constants/routing.constants';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  {
    path: RoutingConstants.GENERAL,
    loadChildren: () =>
      import('./lazy-modules/main/main.module').then((m) => m.MainModule),
    canActivate: [AuthGuard],
  },
  {
    path: RoutingConstants.AUTH,
    loadChildren: () =>
      import('./lazy-modules/authorization/authorization.module').then(
        (m) => m.AuthorizationModule
      ),
  },
  {
    path: '**',
    redirectTo: RoutingConstants.GENERAL,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
