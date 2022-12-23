import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegistrationPageComponent } from './pages/registration-page/registration-page.component';
import { ForgetPasswordPageComponent } from './pages/forget-password-page/forget-password-page.component';
import { CheckMailPageComponent } from './pages/check-mail-page/check-mail-page.component';
import { RoutingConstants } from '../../shared/constants/routing.constants';

const routes: Routes = [
  {
    path: RoutingConstants.LOGIN,
    component: LoginPageComponent,
  },
  {
    path: RoutingConstants.REGISTRATION,
    component: RegistrationPageComponent,
  },
  {
    path: RoutingConstants.FORGET_PASSWORD,
    component: ForgetPasswordPageComponent,
  },
  {
    path: RoutingConstants.CHECK_MAIL,
    component: CheckMailPageComponent,
  },
  {
    path: '**',
    redirectTo: RoutingConstants.LOGIN,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthorizationRoutingModule {}
