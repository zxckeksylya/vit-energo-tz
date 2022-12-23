import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { setErrorAction, showMessageAction } from './errors.action';
import { map } from 'rxjs';

@Injectable()
export class ErrorEffects {
  public setError$ = createEffect(() =>
    this.actions$.pipe(
      ofType(setErrorAction),
      map((err) => {
        console.log(err);
        if (err.error.code === 'auth/email-already-in-use') {
          window.alert('полбзователь с данной почтой уже существует');
        }
        return showMessageAction();
      })
    )
  );
  constructor(private actions$: Actions) {}
}
