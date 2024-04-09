import z, { optional } from 'zod'
// signup 
export const signupInput = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().optional()
});

export type SignupInput = z.infer<typeof signupInput>

// signin
export const signinInput = z.object({
    email: z.string().email(),
    password: z.string().min(6)
});

export type SigninInput = z.infer<typeof signinInput>

// post blog
export const createBlogInput = z.object({
    title: z.string(),
    content: z.string()
});

export type CreateBlogInput = z.infer<typeof createBlogInput>

// put blog
export const updateBlogInput = z.object({
    title: z.string(),
    content: z.string(),
    id: z.string()
});

export type UpdateBlogInput = z.infer<typeof updateBlogInput>
 