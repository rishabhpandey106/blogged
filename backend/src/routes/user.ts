import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { signinInput, signupInput } from "@rishabhpandey106/blog-common";

export const userRoute = new Hono<{
    Bindings: {
		DATABASE_URL: string,
    JWT_SECRET: string
	}
}>();

userRoute.post('/signin', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate())
  
    const reqBody = await c.req.json();
    const {success} = signinInput.safeParse(reqBody);
    
    if(!success)
      {
        c.status(411);
        return c.json({
          error: "Incorrect Input"
        });
      }
  
    try {
      const user = await prisma.user.findUnique({
        where: {
          email: reqBody.email,
          password: reqBody.password
        }
      });
  
      if (!user) {
        c.status(400);
        return c.json({ error: "user not found" });
      }
  
      const token = await sign({ id: user.id }, c.env.JWT_SECRET);
        return c.json({message: "Signin Done" , data: token},{status: 200});
  
    } catch (error:any) {
      return c.json({error: error},{status:500});
    }
  
  })
  
  userRoute.post('/signup', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate())
  
    const reqBody = await c.req.json();
    const {success} = signupInput.safeParse(reqBody); 

    if(!success)
      {
        c.status(411);
        return c.json({
          error: "Incorrect Input"
        });
      }
  
    try {
  
      const user = await prisma.user.create({
        data: {
          email: reqBody.email,
          password: reqBody.password,
          name: reqBody.name
        }
      });
  
      const token = await sign({id: user.id}, c.env?.JWT_SECRET)
  
      return c.json({message: "Signup Done & Token Sent" , data: token},{status: 200});
  
    } catch (error:any) {
      return c.json({error: error},{status:500});
    }
  
  })