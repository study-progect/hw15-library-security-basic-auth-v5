import {Request} from 'express'

export interface AuthRequest extends Request{
    username?:string,
    role?: Role
}

export enum Role {
    USER= 'user',
    ADMIN = 'admin',
    GUEST = 'guest'
}