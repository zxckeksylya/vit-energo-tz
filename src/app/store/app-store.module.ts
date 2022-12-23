import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { metaReducers, reducers } from './app.reducers';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffect } from './auth/auth.effect';
import { ErrorEffects } from './errors/errors.effect';
import { PostEffects } from './posts/posts.effects';
import { CategoryEffect } from './categories/category.effects';

@NgModule({
  imports: [
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([
      AuthEffect,
      ErrorEffects,
      PostEffects,
      CategoryEffect,
    ]),
  ],
  exports: [StoreModule, EffectsModule],
})
export class AppStoreModule {}
