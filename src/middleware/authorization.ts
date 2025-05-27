import {AuthRequest, Role} from "../utils/libTypes.js";
import {NextFunction, Response} from "express";

export const authorize = (arr:Record<string, Role[]>) =>
    (req: AuthRequest, res:Response, next: NextFunction) => {
    const pathMethod = req.path + req.method;
    const role = req.role;
        if (pathMethod === '/accountsPOST' && arr[pathMethod].includes(Role.USER)) {
            return next();
        }
    if(!role || !arr[pathMethod].includes(role))
        throw new Error(JSON.stringify({status: 403, message:""}))
    else next();
    }