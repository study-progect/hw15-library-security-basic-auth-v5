import {Role} from "../utils/libTypes.js";

export type ReaderDto = {
    userName:string,
    password: string,
    email: string,
    birthdate: string
    role:Role
}