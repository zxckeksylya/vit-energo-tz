import { createAction, props } from '@ngrx/store';

export const setErrorAction = createAction(
  '[ERROR] set error',
  props<{ error: any }>()
);

export const showMessageAction = createAction('[ERROR] show error message');
