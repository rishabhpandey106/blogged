import { Blog } from "../hooks"
import { AppBar } from "./AppBar";
import { Avatar } from "./BlogCard";

export const BlogView = ({blog}:{blog:Blog}) => {
    
    return <div> 
        <AppBar/>
        <div className="flex justify-center">
            <div className="grid grid-cols-12 px-40 pt-10 w-full">
                <div className="col-span-8 pr-5">
                    <div className="font-extrabold text-3xl">
                        {blog.title}
                    </div>
                    <div className="pt-2 text-sm font-thin text-slate-500 underline">
                        Posted on 1 April 2024
                    </div>
                    <div className=" pt-2 text-xl text-slate-600">
                        {blog.content}
                    </div>
                </div>
                <div className="col-span-4">
                    <div className="flex font-semibold">
                        Blog ID : <div className="flex justify-center flex-col pl-1 font-thin">{blog.id}</div> 
                    </div>
                    <div className="flex">
                        <div className="flex justify-center flex-col pr-2 text-2xl font-bold">
                            {blog.author.name || "Anonymous"}
                        </div>
                        <div className="flex justify-center flex-col">
                            <Avatar name={blog.author.name || "Anonymous"}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}