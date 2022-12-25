import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentsPageComponent } from './pages/contents-page/contents-page.component';

const routes: Routes = [
  {
    path:'',
    component:ContentsPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentsRoutingModule { }
