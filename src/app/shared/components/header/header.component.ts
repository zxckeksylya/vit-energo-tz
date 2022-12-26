import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppState } from 'src/app/store/app.reducers';
import { Store } from '@ngrx/store';
import { clearAuthStateAction } from '../../../store/auth/auth.actions';
import { RoutingConstants } from '../../constants/routing.constants';
import { clearCommentsAction } from '../../../store/comments/comments.action';
import { clearPostsAction } from 'src/app/store/posts/posts.actions';
import { clearCategoriesAction } from 'src/app/store/categories/category.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(private route: Router, private store: Store<AppState>) {}

  public logout(): void {
    this.store.dispatch(clearAuthStateAction());
    this.store.dispatch(clearCommentsAction());
    this.store.dispatch(clearPostsAction());
    this.store.dispatch(clearCategoriesAction());
    this.route.navigate([RoutingConstants.AUTH]);
  }

  public goToMain():void{
    this.route.navigate([
      RoutingConstants.MAIN
    ])
  }

  public goToPosts(): void {
    this.route.navigate([
      RoutingConstants.GENERAL,
      RoutingConstants.MAIN,
      RoutingConstants.POSTS,
    ]);
  }

  public goToComments():void{
    this.route.navigate([
      RoutingConstants.GENERAL,
      RoutingConstants.MAIN,
      RoutingConstants.CATEGORIES
    ])
  }
}
