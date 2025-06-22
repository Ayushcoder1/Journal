import express from 'express';
import { authmiddleware } from '../middlewares';
import pool from '../db';
import { validatePost } from '../middlewares';

const router = express.Router();

router.post('/blog', authmiddleware, validatePost, async (req : any, res : any) => {
    const email = req.user;

    const {
        rows: [inserted],
    } = await pool.query<{ id: number }>(
        `
        INSERT INTO Post (title, content, published, authorId)
        VALUES (
        $1, $2, $3,
        (SELECT id FROM Users WHERE email = $4)
        )
        RETURNING id;
        `,
        [req.body.title, req.body.content, req.body.published, email]
    );

    return res.status(201).json({ id: inserted.id });
});

router.put('/blog/:id', authmiddleware, validatePost, async (req : any, res : any) => {
    const id = req.params.id;
    await pool.query(`
        UPDATE Post
        SET title=$1, content=$2, published=$3
        WHERE id = $4;
    `,[req.body.title, req.body.content, req.body.published, id]);

    return res.status(200).json();
})

router.get('/blog/:id', authmiddleware, async (req : any, res : any) => {
    const id : string = req.params.id;

    const data = await pool.query(`
        SELECT p.id, p.title, p.content, p.created_at, p.reads, u.name FROM
        Users u JOIN Post p ON u.id = p.authorId
        WHERE p.id = $1
        ORDER BY reads DESC LIMIT 10;
    `, [id]);

    return res.status(200).json(data.rows);
})

router.get('/feed', authmiddleware, async (req : any, res : any) => {
    const email = req.user;
    // console.log(email);
    const data = await pool.query(`
        SELECT p.id, p.title, p.content, p.created_at, p.reads, u.name FROM
        Users u JOIN Post p ON u.id = p.authorId
        WHERE u.email != $1
        ORDER BY reads DESC LIMIT 10;
    `, [email]);
    // console.log(data);
    return res.status(200).json(data.rows);
})

router.get('/stories', authmiddleware, async (req : any, res : any) => {
    const email = req.user;
    // console.log(email);
    const data = await pool.query(`
        SELECT p.id, p.title, p.content, p.created_at, p.reads, p.published, u.name FROM
        Users u JOIN Post p ON u.id = p.authorId
        WHERE u.email = $1
        ORDER BY reads DESC;
    `, [email]);
    // console.log(data);
    return res.status(200).json(data.rows);
})

export default router;