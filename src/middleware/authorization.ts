import {AuthRequest, Role} from "../utils/libTypes.js";
import {NextFunction, Response} from "express";

// export const authorize = (arr:Record<string, Role[]>) =>
//     (req: AuthRequest, res:Response, next: NextFunction) => {
//     const pathMethod = req.path + req.method;
//     const role = req.role;
//     if(!role || !arr[pathMethod].includes(role))
//         throw new Error(JSON.stringify({status: 403, message:""}))
//     else next();
//     }
export const authorize = (arr: Record<string, Role[]>) =>
    (req: AuthRequest, res: Response, next: NextFunction) => {
        // Normalize dynamic routes
        let path = req.path;
        // Map /accounts/account/:id to /accounts/account
        if (path.startsWith('/accounts/account/')) {
            path = '/accounts/account';
        }

        const pathMethod = path + req.method;
        const role = req.role;

        console.log(`pathMethod: ${pathMethod}, role: ${role}`); // Debugging

        if (!arr[pathMethod] || !role || !arr[pathMethod].includes(role)) {
            return res.status(403).json({ status: 403, message: 'Forbidden' });
        }

        next();
    };