import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxListComponent } from './checkbox-list.component';
import { CheckboxModule } from '../checkbox/checkbox.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CheckboxListComponent
  ],
  imports: [
    CommonModule,CheckboxModule,ReactiveFormsModule
  ],exports:[
    CheckboxListComponent
  ]
})
export class CheckboxListModule { }
