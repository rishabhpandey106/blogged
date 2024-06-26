import { BlogView } from "../components/BlogView"
import { useParams } from "react-router-dom";
import { useBlog } from "../hooks";

export const Blog = () => {
  const {id} = useParams();
  const {loading , blog} = useBlog({id: id || ""});
  if(loading)
      {
          return <div > 
            <div className="flex items-center justify-center h-screen">
                <div className="relative">
                    <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
                    <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-orange-500 animate-spin"></div>
                </div>
            </div>
          </div>
      }

  return (
    <div>
      {/* @ts-ignore */}
      <BlogView blog={blog}/>
    </div>
  )
}
