import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PostCardComponent } from './components/post-card/post-card.component';
import { ContentsRoutingModule } from './contents-routing.module';
import { ContentsPageComponent } from './pages/contents-page/contents-page.component';
import { CheckboxListModule } from '../../shared/components/controls/checkbox-list/checkbox-list.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ContentsPageComponent, PostCardComponent],
  imports: [CommonModule, ContentsRoutingModule,CheckboxListModule,ReactiveFormsModule],
})
export class ContentsModule {}
