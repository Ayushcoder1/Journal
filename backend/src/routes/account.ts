import express from 'express';
import { authmiddleware } from '../middlewares';
import prisma from '../prisma';
import { validatePost } from '../middlewares';

const router = express.Router();

router.post('/blog', authmiddleware, validatePost, async (req : any, res : any) => {
    const email = req.user;
    const title : string = req.body.title == "" ? 'Untitled story' : req.body.title;

    const id = await prisma.post.create({
        data: {
            title,
            content: req.body.content,
            published: req.body.published,
            authorid: BigInt((await prisma.users.findUnique({ where: { email }, select: { id: true } }))?.id || 0),
        },
        select: { id: true },
    });
    // console.log('Created post with id:', id);
    return res.status(201).json(id.id.toString());
});

router.put('/blog/:id', authmiddleware, validatePost, async (req : any, res : any) => {
    const id = req.params.id;
    
    await prisma.post.update({
        where: { id: BigInt(id) },
        data: {
            title : req.body.title,
            content: req.body.content,
            published: req.body.published,
        },
    });

    return res.status(200).json();
})

router.get('/blog/:id', authmiddleware, async (req: any, res: any) => {
  const idStr = req.params.id;
  if (typeof idStr !== 'string' || !/^\d+$/.test(idStr)) {
    return res.status(400).json({ error: 'Invalid id' });
  }

  try {
    const postId = BigInt(idStr);

    const post = await prisma.post.update({
      where: { id: postId },
      data: { reads: { increment: BigInt(1) } }, // reads is BigInt in schema
      include: { users: { select: { name: true } } }, // include author
    });

    if (!post) return res.status(404).json({ error: 'Post not found' });
    // console.log('Post found:', post);

    return res.status(200).json({
      id: post.id.toString(),                  
      title: post.title,
      content: post.content ?? null,
      created_at: post.created_at,             
      reads: post.reads?.toString() ?? '0',    
      name: post.users?.name ?? null,          
    });
  } catch (err: any) {
    // Prisma P2025: record to update not found
    if (err?.code === 'P2025') return res.status(404).json({ error: 'Post not found' });

    console.error('GET /blog/:id error', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/feed', authmiddleware, async (req: any, res: any) => {
  try {
    const email = typeof req.user === 'string' ? req.user : req.user?.email;
    if (!email) return res.status(400).json({ error: 'Missing user email' });

    const current = await prisma.users.findUnique({
      where: { email },
      select: { id: true }
    });
    if (!current) return res.status(404).json({ error: 'User not found' });
    const userId = current.id;

    const posts = await prisma.post.findMany({
      where: {
        published: true,
        users: { email: { not: email } }
      },
      orderBy: { reads: 'desc' },
      take: 10,
      select: {
        id: true,
        title: true,
        content: true,
        created_at: true,
        reads: true,
        users: { select: { name: true } },
        bookmarks: { where: { user_id: userId }, select: { post_id: true } }
      }
    });

    const result = posts.map((p : any) => ({
      id: typeof p.id === 'bigint' ? p.id.toString() : p.id,
      title: p.title,
      content: p.content ?? null,
      created_at: p.created_at,
      reads: typeof p.reads === 'bigint' ? p.reads.toString() : (p.reads ?? '0'),
      name: p.users?.name ?? null,
      bookmark: Array.isArray(p.bookmarks) && p.bookmarks.length > 0
    }));

    return res.status(200).json(result);
  } catch (err: any) {
    console.error('GET /feed error', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/stories', authmiddleware, async (req : any, res : any) => {
    const email = req.user;
    // console.log(email);
    const data = await prisma.post.findMany({
        where: { users: { email } },
        orderBy: { reads: 'desc' },
        select: {
            id: true,
            title: true,
            content: true,
            created_at: true,
            reads: true,
            published: true,
            users: { select: { name: true } }
        }
    });
    // console.log(data);

    const result = data.map((p : any) => ({
      id: typeof p.id === 'bigint' ? p.id.toString() : p.id,
      title: p.title,
      content: p.content ?? null,
      created_at: p.created_at,
      reads: typeof p.reads === 'bigint' ? p.reads.toString() : (p.reads ?? '0'),
      name: p.users?.name ?? null,
      published: p.published,
      bookmark: Array.isArray(p.bookmarks) && p.bookmarks.length > 0
    }));

    return res.status(200).json(result);
})

router.get('/blog/filter/:filter', authmiddleware, async (req: any, res: any) => {
  try {
    const filter = req.params.filter ?? '';

    const posts = await prisma.post.findMany({
      where: {
        published: true,
        title: { contains: filter, mode: 'insensitive' },
      },
      orderBy: { reads: 'desc' },
      take: 10,
      select: {
        id: true,
        title: true,
        content: true,
        created_at: true,
        reads: true,
        users: { select: { name: true } },
        bookmarks: true, // we won't rely on it, but kept for parity if needed
      },
    });

    const result = posts.map((p: any) => ({
      id: typeof p.id === 'bigint' ? p.id.toString() : p.id,
      title: p.title,
      content: p.content ?? null,
      created_at: p.created_at,
      reads: typeof p.reads === 'bigint' ? p.reads.toString() : (p.reads ?? '0'),
      name: p.users?.name ?? null,
      bookmark: Array.isArray(p.bookmarks) && p.bookmarks.length > 0,
    }));

    return res.status(200).json(result);
  } catch (err: any) {
    console.error('GET /blog/filter/:filter error', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/bookmark', authmiddleware, async (req: any, res: any) => {
  try {
    const email = typeof req.user === 'string' ? req.user : req.user?.email;
    if (!email) return res.status(400).json({ error: 'Missing user email' });

    const postIdRaw = req.body.post_id;
    if (!postIdRaw) return res.status(400).json({ error: 'Missing post_id' });

    const postId = BigInt(postIdRaw);

    const current = await prisma.users.findUnique({ where: { email }, select: { id: true } });
    if (!current) return res.status(404).json({ error: 'User not found' });
    const userId = current.id;

    const existing = await prisma.bookmarks.findFirst({
      where: { user_id: userId, post_id: postId },
    });

    if (existing) {
      await prisma.bookmarks.deleteMany({ where: { user_id: userId, post_id: postId } });
      return res.status(200).json({ msg: 'Bookmark removed' });
    } else {
      await prisma.bookmarks.create({ data: { user_id: userId, post_id: postId } });
      return res.status(200).json({ msg: 'Bookmark added' });
    }
  } catch (err: any) {
    console.error('POST /bookmark error', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/bookmarks', authmiddleware, async (req: any, res: any) => {
  try {
    const email = typeof req.user === 'string' ? req.user : req.user?.email;
    if (!email) return res.status(400).json({ error: 'Missing user email' });

    const current = await prisma.users.findUnique({ where: { email }, select: { id: true } });
    if (!current) return res.status(404).json({ error: 'User not found' });
    const userId = current.id;

    // find posts which have a bookmark by this user
    const posts = await prisma.post.findMany({
      where: { bookmarks: { some: { user_id: userId } } },
      orderBy: { reads: 'desc' },
      select: {
        id: true,
        title: true,
        content: true,
        created_at: true,
        reads: true,
        users: { select: { name: true } },
      },
    });

    const result = posts.map((p: any) => ({
      id: typeof p.id === 'bigint' ? p.id.toString() : p.id,
      title: p.title,
      content: p.content ?? null,
      created_at: p.created_at,
      reads: typeof p.reads === 'bigint' ? p.reads.toString() : (p.reads ?? '0'),
      name: p.users?.name ?? null,
      bookmark: true,
    }));

    return res.status(200).json(result);
  } catch (err: any) {
    console.error('GET /bookmarks error', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/comment', authmiddleware, async (req: any, res: any) => {
  try {
    const email = typeof req.user === 'string' ? req.user : req.user?.email;
    if (!email) return res.status(400).json({ error: 'Missing user email' });
    const { post_id, content, author } = req.body;
    if (!post_id || !content || !author) return res.status(400).json({ error: 'Missing post_id, content or author' });
    const postId = BigInt(post_id);

    const current = await prisma.users.findUnique({ where: { email }, select: { id: true } });
    if (!current) return res.status(404).json({ error: 'User not found' });
    const userId = current.id;
    const comment = await prisma.comments.create({
      data: {
        postid: postId,
        authorid: userId,
        content : content,
      },
      select: {
        id: true,
        users: {select: { name: true }},
        content: true,
        created_at: true,
        likes: true
      }
    });

    const formatted = {
      id: typeof comment.id === 'bigint' ? comment.id.toString() : comment.id,
      content: comment.content ?? null,
      created_at: comment.created_at,
      likes: comment.likes?.toString() ?? '0',
      name: comment.users?.name ?? null,
    };
    return res.status(201).json(formatted);
  } catch (err: any) {
    console.error('POST /comment error', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/comments/:post_id', authmiddleware, async (req: any, res: any) => {
  try {
    const postIdStr = req.params.post_id;
    if (typeof postIdStr !== 'string' || !/^\d+$/.test(postIdStr)) {
      return res.status(400).json({ error: 'Invalid post_id' });
    }
    const postId = BigInt(postIdStr);

    const comments = await prisma.comments.findMany({
      where: { postid: postId },
      orderBy: { created_at: 'asc' },
      select: {
        id: true,
        users: { select: { name: true } },
        content: true,
        created_at: true,
        likes: true,
      },
    });
    const result = comments.map((c: any) => ({
      id: typeof c.id === 'bigint' ? c.id.toString() : c.id,
      content: c.content ?? null,
      created_at: c.created_at,
      likes: c.likes?.toString() ?? '0',
      name: c.users?.name ?? null,
    }));
    return res.status(200).json(result);
  } catch (err: any) {
    console.error('GET /comments/:post_id error', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
