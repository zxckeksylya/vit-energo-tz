import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { User } from 'src/app/shared/interfaces/user.interface';
import { AuthorizationService } from '../../shared/services/authorization.service';
import { RoutingConstants } from '../../shared/constants/routing.constants';
import { successShowMessage } from './auth.actions';
import {
  clearAuthStateAction,
  clearAuthStateSuccessAction,
  failedLoginUserAction,
  failedRegisterUserAction,
  initUserAction,
  initUserSuccessAction,
  loginUserAction,
  registerUserAction,
  successLoginUserAction,
  successRegisterUserAction,
} from './auth.actions';
import { setErrorAction } from '../errors/errors.action';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducers';

@Injectable()
export class AuthEffect {
  public initUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(initUserAction),
      map(() => {
        let user: null | User = null;
        let memo: string = localStorage.getItem('user') || '';
        if (user !== '') {
          user = JSON.parse(memo);
        } else {
          user = null;
        }
        return initUserSuccessAction({ user });
      })
    )
  );

  public loginUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginUserAction),
      switchMap((loginUser) => this.authService.login(loginUser)),
      switchMap((loginResponse) =>
        this.authService.setUserData(loginResponse.user)
      ),
      map((user) => {
        localStorage.setItem('user', JSON.stringify(user));
        this.route.navigate([RoutingConstants.MAIN]);
        return successLoginUserAction({ user });
      }),
      catchError((error) => of(failedLoginUserAction({ error })))
    )
  );

  public registerUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(registerUserAction),
      switchMap((registerUser) => this.authService.registration(registerUser)),
      switchMap((loginResponse) => {
        loginResponse.user
          ?.sendEmailVerification()
          .then(() => console.log('email output'));
        this.route.navigate([
          RoutingConstants.AUTH,
          RoutingConstants.CHECK_MAIL,
        ]);
        return this.authService.setUserData(loginResponse.user);
      }),
      map((user) => {
        return successRegisterUserAction({ user });
      }),
      catchError((error) => of(failedRegisterUserAction({ error })))
    )
  );

  public clearState$ = createEffect(() =>
    this.actions$.pipe(
      ofType(clearAuthStateAction),
      switchMap(() => this.authService.logout()),
      map(() => {
        localStorage.removeItem('user');
        return clearAuthStateSuccessAction();
      })
    )
  );

  public registerFailed$ = createEffect(() =>
    this.actions$.pipe(
      ofType(failedRegisterUserAction),
      map((error) => {
        return setErrorAction({ error: error.error });
      })
    )
  );

  public loginFailed$ = createEffect(() =>
    this.actions$.pipe(
      ofType(failedLoginUserAction),
      map((error) => {
        return setErrorAction({ error: error.error });
      })
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthorizationService,
    private route: Router,
    private store: Store<AppState>
  ) {}
}
