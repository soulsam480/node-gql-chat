import jwt from 'jsonwebtoken';
import * as dotenv from "dotenv";
dotenv.config()

export default (context: any) => {
    let user: any;
    if (context.req && context.req.headers.authorization) {
        const token = context.req.headers.authorization.split('Bearer ')[1];
        user = jwt.verify(token, process.env.TOKEN!, (err: any, res: any) => {
            return res
        })
    }
    context.user = user
    return context
}