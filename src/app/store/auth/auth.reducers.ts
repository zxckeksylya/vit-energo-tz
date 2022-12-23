import { state } from '@angular/animations';
import { createReducer, on } from '@ngrx/store';
import { User } from 'src/app/shared/interfaces/user.interface';
import {
  failedLoginUserAction,
  failedRegisterUserAction,
} from './auth.actions';
import {
  successRegisterUserAction,
  successLoginUserAction,
  registerUserAction,
  loginUserAction,
} from './auth.actions';
import {
  initUserSuccessAction,
  clearAuthStateSuccessAction,
} from './auth.actions';

export const AUTH_FEATURE_KEY = 'auth';

export interface AuthState {
  formBlock: boolean;
  user: User | null;
}

export const initialAuthState: AuthState = {
  formBlock: false,
  user: null,
};

export const authReducer = createReducer(
  initialAuthState,
  on(initUserSuccessAction, (state, action) => ({
    ...state,
    user: action.user,
  })),

  on(clearAuthStateSuccessAction, () => initialAuthState),

  on(registerUserAction, loginUserAction, (state) => ({
    ...state,
    formBlock: true,
  })),

  on(successRegisterUserAction, (state, action) => ({
    ...state,
    user: action.user,
    formBlock: false,
  })),

  on(successLoginUserAction, (state, action) => ({
    ...state,
    user: action.user,
    formBlock: false,
  })),

  on(failedLoginUserAction, failedRegisterUserAction, (state) => ({
    ...state,
    formBlock: false,
  }))
);
