import { IUserState, initialUserState } from './../states/user.state';
import { createReducer, on, Action } from "@ngrx/store";
import * as userActions from '../actions/user.action';
import { ILogin } from '../../models/user.model';

export const intialState = initialUserState;

const reducer = createReducer(
    intialState,
    on(userActions.GetUser, state => state),
    on(userActions.LoginUser, (state: IUserState, {payload}) => {
        return {...state, error: null};
    }),
    on(userActions.LoginUserSuccess, (state: IUserState, {payload}) => {
        return { ...state, ...payload.data.user, error : null};
    }),
    on(userActions.ErrorUserAction, (state: IUserState, error: Error) => {
        return { ...state, error, user: null};
    })
)

export function UserReducer(state: IUserState | undefined, action: Action){
    return reducer(state, action);
}