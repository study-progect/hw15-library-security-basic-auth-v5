import {Reader} from "../model/Reader.js";

export interface AccountService {
    addAccount: (reader:Reader) => Promise<void>;
    getAccount: (userName:string) => Promise<Reader>;
    updateAccount:(reader:Reader) => Promise<void>;
    removeAccount:(userName:string) => Promise<Reader>;
}