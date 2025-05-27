import {AccountService} from "./AccountService.js";
import {Reader} from "../model/Reader.js";
import {ReaderModel} from "../model/ReaderMongo.js";
import {Error} from "mongoose";



export class AccountServiceImplMongo implements AccountService{

    async addAccount(reader: Reader): Promise<void> {
        const temp = await ReaderModel.findOne({readerId: reader.readerId});

        if(temp) throw new Error(JSON.stringify({status: 409, message: `User ${reader.readerId} already exists`}))
            const readerDoc = new ReaderModel(reader);
            await readerDoc.save();
        }


    async getAccount(userName: string): Promise<Reader> {
        const reader = await ReaderModel.findOne({readerId: userName});
        console.log(reader)
        if(!reader) throw new Error(JSON.stringify({status: 404, message: `User ${userName} not found`}))
        return Promise.resolve(reader);
    }

    async removeAccount(userName: string): Promise<Reader> {
        const reader = await ReaderModel.findOneAndDelete({readerId: userName});
        if (!reader) throw new Error(JSON.stringify({status: 404, message: `Reader ${userName} not found`}))
        return reader as Reader
    }

    async updateAccount(reader: Reader): Promise<void> {
       const result = await ReaderModel.updateOne({readerId:reader.readerId}, reader)
        if(!result.modifiedCount) throw new Error(JSON.stringify({status: 404, message: `Reader ${reader.readerId} not found`}))
    }

}