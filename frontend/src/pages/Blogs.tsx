import { AppBar } from "../components/AppBar"
import { BlogCard } from "../components/BlogCard"
import { useBlogs } from "../hooks"

export const Blogs = () => {
  const {loading , blogs} = useBlogs();

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

    return <div>
      <AppBar/>
      <div className="flex justify-center pt-2 bg-orange-100">
        <div className="max-w-xl w-full">
        { blogs.map((blog) => <BlogCard
          id={blog.id}
          authorName={blog.author.name || "Stranger"}
          title={blog.title}
          content={blog.content}
          publishedDate={"1 April 2014"} />)
        }
        </div>
      </div>
      </div>
  }