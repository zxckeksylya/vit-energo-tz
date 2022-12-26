import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { CheckboxListModule } from '../../shared/components/controls/checkbox-list/checkbox-list.module';
import { LikeCheckboxModule } from '../../shared/components/controls/like-checkbox/like-checkbox.module';
import { PostCardComponent } from './components/post-card/post-card.component';
import { ContentsRoutingModule } from './contents-routing.module';
import { ContentsPageComponent } from './pages/contents-page/contents-page.component';
import { ButtonModule } from '../../shared/components/button/button.module';
import { TextareaModule } from '../../shared/components/controls/textarea/textarea.module';
import { CommentCardComponent } from './components/comment-card/comment-card.component';
import { LikeCardComponent } from './components/like-card/like-card.component';

@NgModule({
  declarations: [ContentsPageComponent, PostCardComponent, CommentCardComponent, LikeCardComponent],
  imports: [
    CommonModule,
    ContentsRoutingModule,
    CheckboxListModule,
    ReactiveFormsModule,
    LikeCheckboxModule,
    ButtonModule,
    TextareaModule
  ],
})
export class ContentsModule {}
