import { Link } from "react-router-dom"

interface BlogCardProps {
    id: string;
    authorName: string,
    title: string,
    content: string,
    publishedDate: string 
}

export const BlogCard = ({
    id,
    authorName,
    title,
    content,
    publishedDate
}:BlogCardProps) => {

    return <Link to={`/blog/${id}`}>
        <div className="border-b-2 border-orange-200 pb-2 pt-2 bg-orange-100 cursor-pointer hover:bg-orange-200 pl-2 hover:border-orange-500">
            <div className="flex">
                <div className="flex justify-center flex-col"><Avatar name={authorName}/></div>
                <div className="font-extralight text-extrabold pr-2 ">{authorName}</div>         
                <div className="text-sm flex justify-center flex-col text-slate-300">&#9679;</div>
                <div className="pl-2 font-thin text-slate-500 text-sm flex justify-center flex-col">{publishedDate}</div> 
            </div>
            <div className="text-xl font-semibold pt-2">{title}</div>
            <div className="text-md font-thin">{content.slice(0 , 100) + "...."}</div>
            <div className="mt-1 flex text-xs text-slate-600"><p className="bg-slate-100 text-slate-400 flex justify-center flex-col mr-1">{`${Math.ceil(content.length / 100)}` + " minute(s) read"}</p></div>
        </div>
    </Link>
}

export function Avatar({name}:{name: string}) {
    return <div className="mr-2 relative inline-flex items-center justify-center w-6 h-6 overflow-hidden bg-gray-300 rounded-full dark:bg-gray-600">
        <span className="font-medium text-gray-600 dark:text-gray-300">{name[0].toUpperCase()}</span>
        </div>
    
}