import { createAction, props } from '@ngrx/store';
import { LoginForm } from 'src/app/shared/interfaces/login-form.interface';
import { User } from '../../shared/interfaces/user.interface';

export const initUserAction = createAction('[AUTH] init user');

export const initUserSuccessAction = createAction(
  '[AUTH] success init user action',
  props<{ user: User | null }>()
);

export const loginUserAction = createAction(
  '[AUTH] login user',
  props<LoginForm>()
);

export const registerUserAction = createAction(
  '[AUTH] register user',
  props<LoginForm>()
);

export const successLoginUserAction = createAction(
  '[AUTH] success login user',
  props<{ user: User }>()
);

export const failedLoginUserAction = createAction(
  '[AUTH] failed login user',
  props<{ error: any }>()
);

export const successRegisterUserAction = createAction(
  '[AUTH] success register user',
  props<{ user: User }>()
);

export const failedRegisterUserAction = createAction(
  '[AUTH] failed register user',
  props<{ error: any }>()
);

export const clearAuthStateAction = createAction('[AUTH] clear auth state');

export const clearAuthStateSuccessAction = createAction(
  '[AUTH] success clear auth state'
);

export const successShowMessage = createAction('[AUTH] show message');
