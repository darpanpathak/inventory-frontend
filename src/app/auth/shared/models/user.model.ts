export interface IUser{
    fullName? : string,
    id : string,
    email : string
}

export interface ILogin{
    email : string,
    password : string
}

export interface ISignUp{
    fullName : string,
    email : string,
    password : string
}

export class User implements IUser{
    constructor(public id : string, public email : string, public fullName? : string){}
}