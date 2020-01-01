import { IAPIResponse } from './../../../../shared/classes/api-response';
import { createAction, props } from "@ngrx/store";
import { IUser, ILogin, ISignUp } from '../../models/user.model';

export const GetUser = createAction('[USER] - Get User');

export const LoginUser = createAction('[USER] - Login User', props<{payload : ILogin}>());

export const LoginUserSuccess = createAction('[USER] - Login User Success', props<{payload : IAPIResponse}>());

export const SignupUser = createAction('[USER] - Signup User', props<{payload: ISignUp}>());

export const SignupUserSuccess = createAction('[USER] - Signup User Success', props<{payload : IAPIResponse}>());

export const ErrorUserAction = createAction('[USER] - Error Occured', props<Error>());

export const LogoutUser = createAction('[USER] - Logout User');
