import express from 'express';
import { validateUser } from '../middlewares';
import jwt from 'jsonwebtoken';
import pool from '../db';
import { passKey } from '../config';

const router = express.Router();


router.post('/login', validateUser, async (req : any, res : any) => {
    const lookup = await pool.query(`
        SELECT * FROM Users WHERE email = $1 AND password = $2;
    `, [req.body.email, req.body.password]);

    if(!lookup) return res.status(410).json({msg : "Incorrect Username or Password"});

    const token = jwt.sign(req.body.email, passKey);
    return res.status(200).json({token : token, name : lookup.rows[0].name});
})

router.post('/signup', validateUser, async (req : any, res : any) => {
    // console.log("Hello there!");
    const { rowCount } = await pool.query(`
        SELECT * FROM Users WHERE email = $1;
    `, [req.body.email]);

    if(rowCount) return res.status(410).json({msg : "User with same email address already present."});

    await pool.query(`
        INSERT INTO Users (email, name, password) VALUES ($1, $2, $3);
    `, [req.body.email, req.body.name, req.body.password]);

    const token = jwt.sign(req.body.email, passKey);
    return res.status(200).json({token : token, name : req.body.name});
})

export default router;