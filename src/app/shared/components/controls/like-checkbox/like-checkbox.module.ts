import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LikeCheckboxComponent } from './like-checkbox.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LikeCheckboxComponent
  ],
  imports: [
    CommonModule,ReactiveFormsModule
  ],
  exports:[
    LikeCheckboxComponent
  ]
})
export class LikeCheckboxModule { }
