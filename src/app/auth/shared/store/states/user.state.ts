import { IUser } from '../../models/user.model';

export interface IUserState{
    user : IUser,
    error : Error
}

export const initialUserState : IUserState = {
    user : null,
    error : null
};

