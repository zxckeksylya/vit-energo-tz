import { Component } from '@angular/core';
import { CreatePost } from '../../../../shared/interfaces/post.interface';
import { createPostAction } from '../../../../store/posts/posts.actions';
import { RoutingConstants } from '../../../../shared/constants/routing.constants';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/app.reducers';

@Component({
  selector: 'app-posts-create-page',
  templateUrl: './posts-create-page.component.html',
  styleUrls: ['./posts-create-page.component.scss']
})
export class PostsCreatePageComponent {
  constructor(private store: Store<AppState>, private route: Router) {}

  public createPost(post: CreatePost): void {
    this.store.dispatch(createPostAction({ post }));
    this.route.navigate([RoutingConstants.POSTS]);
  }
}
