import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppState } from 'src/app/store/app.reducers';
import { Store } from '@ngrx/store';
import { clearAuthStateAction } from '../../../store/auth/auth.actions';
import { RoutingConstants } from '../../constants/routing.constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(private route: Router, private store: Store<AppState>) {}

  public logout(): void {
    this.store.dispatch(clearAuthStateAction());
    this.route.navigate([RoutingConstants.AUTH]);
  }
}
