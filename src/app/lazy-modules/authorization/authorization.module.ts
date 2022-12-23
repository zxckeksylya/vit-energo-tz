import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { InputModule } from 'src/app/shared/components/controls/input/input.module';
import { ButtonModule } from '../../shared/components/button/button.module';
import { AuthorizationRoutingModule } from './authorization-routing.module';
import { CheckMailPageComponent } from './pages/check-mail-page/check-mail-page.component';
import { ForgetPasswordPageComponent } from './pages/forget-password-page/forget-password-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegistrationPageComponent } from './pages/registration-page/registration-page.component';

@NgModule({
  declarations: [
    LoginPageComponent,
    RegistrationPageComponent,
    ForgetPasswordPageComponent,
    CheckMailPageComponent,
  ],
  imports: [
    CommonModule,
    AuthorizationRoutingModule,
    ReactiveFormsModule,
    ButtonModule,
    InputModule,
  ],
})
export class AuthorizationModule {}
