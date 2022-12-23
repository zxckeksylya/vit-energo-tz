import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainPageComponent } from './page/main-page/main-page.component';
import { HeaderModule } from '../../shared/components/header/header.module';

@NgModule({
  declarations: [MainPageComponent],
  imports: [CommonModule, MainRoutingModule, HeaderModule],
})
export class MainModule {}
