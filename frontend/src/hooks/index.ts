import axios from "axios";
import { useEffect, useState } from "react"
import { DOMAIN } from "../config";

export interface Blog {
    "title": string;
    "id": string;
    "content": string;
    "author": {
        "name": string;
    }
}

export const useBlogs = () => {
    const [loading, setloading] = useState(true);
    const [blogs, setblogs] = useState<Blog[]>([]);

    useEffect(() => {
      axios.get(`${DOMAIN}/api/v1/blog/bulk` , {
        headers: {
            Authorization : localStorage.getItem("token")
        }
      }).then(res => {
        console.log(res.data.data);
        setblogs(res.data.data);
        setloading(false);
      })
    }, [])

    return {
        loading , 
        blogs
    }  
}

export const useBlog = ({id}: {id: string}) => {
    const [loading, setloading] = useState(true);
    const [blog, setblog] = useState<Blog>();

    useEffect(() => {
      axios.get(`${DOMAIN}/api/v1/blog/${id}` , {
        headers: {
            Authorization : localStorage.getItem("token")
        }
      }).then(res => {
        console.log(res.data.data);
        setblog(res.data.data);
        setloading(false);
      })
    }, [])

    return {
        loading , 
        blog
    }
}