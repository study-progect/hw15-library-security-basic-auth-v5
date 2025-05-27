import express, {Request, Response} from "express";
import asyncHandler from "express-async-handler";
import {passwordUpdateSchema, profileUpdateSchema, readerAccountSchema,} from "../utils/joiSchemas.js";
import {AccountController} from "../controllers/AccountController.js";
import {ReaderDto} from "../model/ReaderDto.js";
import {AuthRequest, Role} from "../utils/libTypes.js";

export const  accountRouter = express.Router();
const controller = new AccountController();

accountRouter.post('/', asyncHandler(async (req:Request, res:Response) => {
    const body = req.body;
    const {error} = readerAccountSchema.validate(body);
    if(error) throw new Error(JSON.stringify({
        status: 400, message: error.message
    }));
    console.log(body)
    await controller.addReaderAccount(body as ReaderDto);
    res.status(201).send();
}));
accountRouter.get('/account/:username', asyncHandler(async (req:AuthRequest, res) => {

   const role = req.role;
   if(!role || role !== Role.USER)
    res.status(403).send()
    const reader_dto = await controller.getReaderAccount(req.params.username as string);
   res.json(reader_dto)
}));
accountRouter.delete('/account/:username', asyncHandler(async (req, res) => {
    const reader = await controller.removeReaderAccount(req.params.username as string);
    res.json(reader)
}))
accountRouter.put('/', asyncHandler(async (req, res) => {
    const body = req.body;
    const {error} = readerAccountSchema.validate(body);
    if (error) throw new Error(JSON.stringify({
        status: 400, message: error.message
    }));
    console.log(body)
    await controller.updateReaderAccount(body as ReaderDto);
    res.send();
}))
accountRouter.put('/password',
    asyncHandler(async (req: AuthRequest, res: Response) => {
        const body = req.body;
        const { error } = passwordUpdateSchema.validate(body);
        if (error) throw new Error(JSON.stringify({ status: 400, message: error.message }));
        if (!req.username) {
            throw new Error(JSON.stringify({ status: 401, message: 'Authentication required' }));
        }
        console.log('Password update:', body);
        await controller.updateReaderPassword(req.username, body.password);
        res.send();
    })
);

accountRouter.put('/profile',
    asyncHandler(async (req: AuthRequest, res: Response) => {
        const body = req.body;
        const { error } = profileUpdateSchema.validate(body);
        if (error) throw new Error(JSON.stringify({ status: 400, message: error.message }));
        if (!req.username) {
            throw new Error(JSON.stringify({ status: 401, message: 'Authentication required' }));
        }
        console.log('Profile update:', body);
        await controller.updateReaderProfile(req.username, body as ReaderDto);
        res.send();
    })
);