import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState, AUTH_FEATURE_KEY } from './auth.reducers';

export const authorizationFeatureSelector =
  createFeatureSelector<AuthState>(AUTH_FEATURE_KEY);

export const formBlockSelector = createSelector(
  authorizationFeatureSelector,
  (state) => state.formBlock
);

export const userSelector = createSelector(
  authorizationFeatureSelector,
  (state) => state.user
);
