import zod from 'zod';
import jwt from 'jsonwebtoken';
import { passKey } from './config';

const userSchema = zod.object({
    email : zod.string().email(),
    name : zod.string().optional(),
    password : zod.string().min(6)
});


const postSchema = zod.object({
    title : zod.string().max(200),
    content : zod.string(),
    published : zod.boolean()
});

export function validateUser(req : any, res : any, next : any){
    // console.log(req.body);
    const { success } = userSchema.safeParse(req.body);
    if(!success) return res.status(409).json({msg : "Invalid user inputs."});
    next();
}

export function validatePost(req : any, res : any, next : any){
    const { success } = postSchema.safeParse(req.body);
    if(!success) return res.status(409).json({msg : "Invalid post inputs."});
    next();
}

export function authmiddleware(req : any, res : any, next : any){
    const token : string = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({msg : 'No token'});
    try {
        const payload = jwt.verify(token, passKey) as jwt.JwtPayload;
        // console.log(payload);
        req.user = payload;
        next();
    } catch (err) {
        res.status(401).send('Invalid token');
    }
}