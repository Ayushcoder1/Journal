import express from 'express';
import { authmiddleware } from '../middlewares';
import pool from '../db';
import { validatePost } from '../middlewares';

const router = express.Router();

router.post('/blog', authmiddleware, validatePost, async (req : any, res : any) => {
    const email = req.user;
    const title : string = req.body.title == "" ? 'Untitled story' : req.body.title;

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
        [title, req.body.content, req.body.published, email]
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

    await pool.query(
      `UPDATE Post SET reads = reads + 1
       WHERE id = $1`,
      [id]
    );

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
        SELECT p.id, p.title, p.content, p.created_at, p.reads, u.name,
        CASE WHEN b.user_id IS NULL THEN FALSE ELSE TRUE END AS bookmark
        FROM Users u
        JOIN Post p
        ON u.id = p.authorId
        LEFT JOIN Bookmarks b
        ON b.post_id = p.id
        AND b.user_id = (SELECT id FROM Users WHERE email = $1) 
        WHERE
        u.email != $1
        AND p.published = TRUE
        ORDER BY reads DESC
        LIMIT 10;
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

router.get('/blog/filter/:filter', authmiddleware, async (req : any, res : any) => {
    const filter = req.params.filter;
    const data = await pool.query(`
        SELECT p.id, p.title, p.content, p.created_at, p.reads, u.name FROM
        Users u JOIN Post p ON u.id = p.authorId
        WHERE p.published = true AND p.title ILIKE $1
        ORDER BY reads DESC LIMIT 10; 
    `, [`%${filter}%`]);

    return res.status(200).json(data.rows);
})

router.post('/bookmark', authmiddleware, async (req : any, res : any) => {
    const email = req.user;
    const postId = req.body.post_id;

    const { rowCount } = await pool.query(`
        SELECT * FROM Bookmarks WHERE user_id = (SELECT id FROM Users WHERE email = $1) AND post_id = $2;
    `, [email, postId]);
    if (rowCount) {
        await pool.query(`
            DELETE FROM Bookmarks WHERE user_id = (SELECT id FROM Users WHERE email = $1) AND post_id = $2;
        `, [email, postId]);
        return res.status(200).json({ msg: "Bookmark removed" });
    } else {
        await pool.query(`
            INSERT INTO Bookmarks (user_id, post_id) VALUES ((SELECT id FROM Users WHERE email = $1), $2);
        `, [email, postId]);
        return res.status(200).json({ msg: "Bookmark added" });
    }
})

router.get('/bookmarks', authmiddleware, async (req : any, res : any) => {
    const email = req.user;
    // console.log(email);
    const data = await pool.query(`
        SELECT p.id, p.title, p.content, p.created_at, p.reads, u.name, TRUE AS bookmark
        FROM Post p
        JOIN Bookmarks b ON p.id = b.post_id
        JOIN Users u ON p.authorId = u.id
        WHERE b.user_id = (SELECT id FROM Users WHERE email = $1)
        ORDER BY p.reads DESC;
    `, [email]);
    // console.log(data);
    return res.status(200).json(data.rows);
})

export default router;