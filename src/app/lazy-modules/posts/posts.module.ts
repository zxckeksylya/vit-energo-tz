import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from '../../shared/components/button/button.module';
import { InputModule } from '../../shared/components/controls/input/input.module';
import { TextareaModule } from '../../shared/components/controls/textarea/textarea.module';
import { PostFormComponent } from './components/post-form/post-form.component';
import { PostsCreatePageComponent } from './pages/posts-create-page/posts-create-page.component';
import { PostsListPageComponent } from './pages/posts-list-page/posts-list-page.component';
import { PostsUpdatePageComponent } from './pages/posts-update-page/posts-update-page.component';
import { PostsRoutingModule } from './posts-routing.module';
import { CheckboxListModule } from '../../shared/components/controls/checkbox-list/checkbox-list.module';

@NgModule({
  declarations: [
    PostsListPageComponent,
    PostsCreatePageComponent,
    PostsUpdatePageComponent,
    PostFormComponent,
  ],
  imports: [
    CommonModule,
    PostsRoutingModule,
    ReactiveFormsModule,
    InputModule,
    ButtonModule,
    TextareaModule,
    CheckboxListModule
  ],
})
export class PostsModule {}
