import axios from "axios"
import { DOMAIN } from "../config"
import { ChangeEvent, useState } from "react"
import { useNavigate } from "react-router-dom";

export const CreateBlog = () => {
    const [title, settitle] = useState("");
    const [content, setcontent] = useState("");
    const navigate = useNavigate();
    return <div>
        <div className="pt-10 pl-10 max-w-screen-lg">
            <div className="flex mb-2">
                <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-orange-300 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                </svg>
                </span>
                <input type="text" id="website-admin" className="rounded-none rounded-e-lg bg-orange-50 border text-gray-900 focus:ring-orange-500 focus:border-orange-500 block flex-1 min-w-0 w-full text-sm font-semibold border-orange-300 p-2.5" placeholder="Title..." onChange={(e) => {settitle(e.target.value)}}/>
            </div>
            <TextEditor onChange={(e) => {setcontent(e.target.value)}}/>
            <button className="mt-2 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-orange-500 rounded-lg focus:ring-4 focus:ring-orange-200 hover:bg-orange-600" onClick={() => {
                console.log(title , content)
                axios.post(`${DOMAIN}/api/v1/blog` , {
                    title,
                    content
                },{
                    headers: {
                        Authorization: localStorage.getItem("token")
                    }
                }).then((res) => {
                    navigate(`/blog/${res.data.id}`);
                })
            }}>Publish post</button>
        </div>
        <div>

        </div>
    </div>
}
//@ts-ignore
function TextEditor ({ onChange } : {onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void}) {
    return <div>
       <div className="w-full mb-4">
           <div className="flex items-center justify-between px-3 py-2 border">
                <div className="py-2 bg-white rounded-b-lg w-full">
                    <label className="sr-only">Publish post</label>
                    <textarea onChange={onChange} rows={8} className="block w-full px-0 text-sm text-gray-800 bg-white border-0 focus:outline-none" placeholder="Write an article..." required />
                </div>
           </div>
       </div>
    </div>
}