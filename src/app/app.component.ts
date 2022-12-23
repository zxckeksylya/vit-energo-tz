import { Component, OnInit } from '@angular/core';
import { AppState } from './store/app.reducers';
import { Store } from '@ngrx/store';
import { initUserAction } from './store/auth/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private store: Store<AppState>) {}

  public ngOnInit(): void {
    this.store.dispatch(initUserAction());
  }
}
