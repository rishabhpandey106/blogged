import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { createBlogInput, updateBlogInput } from "@rishabhpandey106/blog-common";

export const blogRoute = new Hono<{
    Bindings: {
		DATABASE_URL: string,
        JWT_SECRET: string
	},
    Variables: {
        userID: string
    }
}>();

blogRoute.use('/*' , async (c, next) => {
    const header = c.req.header("Authorization") || "";
  
    if(!header)
      {
        c.status(400);
        return c.json({ error: "Unauthorized" });
      }
    
    const token = header
  
    const auth = await verify(token , c.env?.JWT_SECRET)
  
    if(!auth)
      {
        c.status(400);
        return c.json({ error: "Unauthorized" });
      }
    
    c.set('userID' , auth.id);
  
    await next();
})


blogRoute.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
      }).$extends(withAccelerate())

    try {
        const blogs = await prisma.post.findMany({
          select: {
            content: true,
            id: true,
            title: true,
            published: true,
            author: {
              select: {
                name: true
              }
            }
          }
        });

        return c.json({message: "Fetched the blogs" , data: blogs},{status: 200});
    } catch (error:any) {
        return c.json({message: "Error while fetching all blogs", error: error},{status:500});
    }
})

blogRoute.get('/:id', async (c) => {
    const id = c.req.param("id");
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
      }).$extends(withAccelerate())

    try {
        const blog = await prisma.post.findFirst({
            where: {
                id: id
            },
            select: {
              id: true,
              title: true,
              content: true,
              author: {
                select: {
                  name: true
                }
              }
            }
        })

        return c.json({message: "Fetched the blog" , data: blog},{status: 200});
    } catch (error:any) {
        return c.json({message: "Error while fetching blog", error: error},{status:500});
    }
})
  
blogRoute.put('/', async (c) => {
    const reqBody = await c.req.json();
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
      }).$extends(withAccelerate())
    
    const {success} = updateBlogInput.safeParse(reqBody);
    
    if(!success)
      {
        c.status(411);
        return c.json({
          error: "Incorrect Input"
        });
      }

    try {
        const blog = await prisma.post.update({
            where: {
                id: reqBody.id
            },
            data: {
                title: reqBody.title,
                content: reqBody.content
            }
        })

        return c.json({message: "Updated the blog"},{status: 200});
    } catch (error:any) {
        return c.json({message: "Error while updating blog", error: error},{status:500});
    }
})

blogRoute.post('/', async (c) => {
    const reqBody = await c.req.json();

    const {success} = createBlogInput.safeParse(reqBody);
    
    if(!success)
      {
        c.status(411);
        return c.json({
          error: "Incorrect Input"
        });
      }

    const userID = c.get("userID");

    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
      }).$extends(withAccelerate())

    try {
        const blog = await prisma.post.create({
            data: {
                title: reqBody.title,
                content: reqBody.content,
                authorId: userID
            }
        })

        return c.json({message: "Created the blog" , id: blog.id},{status: 200});
    } catch (error:any) {
        return c.json({message: "Error while creating blog", error: error},{status:500});
    }
})