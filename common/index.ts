import zod from 'zod';

export const userSchema = zod.object({
    email : zod.string().email(),
    name : zod.string(),
    password : zod.string().min(6)
});

export type userType = zod.infer<typeof userSchema>;

export const postSchema = zod.object({
    title : zod.string().max(200),
    content : zod.string(),
    published : zod.boolean()
});

export type postType = zod.infer<typeof postSchema>;