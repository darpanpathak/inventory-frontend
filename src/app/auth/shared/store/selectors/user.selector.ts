import { IUserState } from './../states/user.state';
import { createSelector, createFeatureSelector } from '@ngrx/store';

const userState = createFeatureSelector<IUserState>("authModule");

export const appUser = createSelector(
    userState,
    (state : IUserState) => state
);   