import {ReaderDto} from "../model/ReaderDto.js";
import {Reader} from "../model/Reader.js";
import {convertReaderDtoToReader, convertReaderToReaderDto} from "../utils/tools.js";
import {AccountService} from "../service/AccountService.js";
import {AccountServiceImplMongo} from "../service/AccountServiceImplMongo.js";
import {accService} from "../config/libConfig.js";



export class AccountController {
    private service:AccountService = accService;

    async addReaderAccount(dto: ReaderDto) {
    const reader:Reader = convertReaderDtoToReader(dto);
        console.log(reader)
    await this.service.addAccount(reader);
    }

    async getReaderAccount(username: string) {
       const reader = await this.service.getAccount(username)
        return convertReaderToReaderDto(reader)
    }

    async removeReaderAccount(username: string) {
        const reader = await this.service.removeAccount(username)
        return Promise.resolve(reader)
    }

    async updateReaderAccount(dto: ReaderDto) {
        const reader:Reader = convertReaderDtoToReader(dto);
        await this.service.updateAccount(reader);
        return convertReaderToReaderDto(reader)
    }
    async updateReaderPassword(userName: string, password: string) {
        const reader = await this.service.updateReaderPassword(userName, password);
        return convertReaderToReaderDto(reader)
    }
    async updateReaderProfile(userName: string, profileData:ReaderDto) {
        const reader = await this.service.updateReaderProfile(userName, profileData);
        return convertReaderToReaderDto(reader)
    }
}