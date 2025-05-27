import {Reader} from "../model/Reader.js";
import {ReaderDto} from "../model/ReaderDto.js";

export interface AccountService {
    addAccount: (reader:Reader) => Promise<void>;
    getAccount: (userName:string) => Promise<Reader>;
    updateAccount:(reader:Reader) => Promise<void>;
    removeAccount:(userName:string) => Promise<Reader>;
    updateReaderPassword:(userName:string,password:string) => Promise<Reader>;
    updateReaderProfile:(userName: string, profileData:ReaderDto) => Promise<Reader>;
}