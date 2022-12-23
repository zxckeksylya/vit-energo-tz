import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, take, map } from 'rxjs';
import { AppState } from '../../store/app.reducers';
import { userSelector } from '../../store/auth/auth.selectors';
import { RoutingConstants } from '../constants/routing.constants';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store<AppState>, private route: Router) {}

  public canActivate(): Observable<boolean> {
    return this.store.pipe(
      select(userSelector),
      take(1),
      map((user) => {
        if (user !== null && user.emailVerified === true) {
          return true;
        }
        this.route.navigate([RoutingConstants.AUTH]);
        return false;
      })
    );
  }

  public canActivateChild(): Observable<boolean> {
    return this.canActivate();
  }
}
