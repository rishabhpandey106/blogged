import { Link, useNavigate } from "react-router-dom"
import LOGO from "../assets/logo.jpg"

export const AppBar = () => {
    const navigate = useNavigate()
    const handleClickButton = () => {
        navigate("/publish")
    }

    return <div className="border-y-2 bg-white flex justify-between px-20 py-3 border-orange-600">
        <div className="flex flex-col justify-center cursor-pointer"> 
        <Link to={"/blogs"}>
            <img src={LOGO} alt="logo" />
        </Link>
        </div>
        <div className="flex">
            <div className="flex justify-center flex-col pr-2">
            <button type="button" className="text-white bg-orange-400 hover:bg-orange-500 focus:outline-none focus:ring-4 focus:ring-orange-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-orange-900" onClick={handleClickButton}>New Blog</button>
            </div>
            <Avatar name="rishabh"/>
        </div>
    </div>
}

function Avatar({name}:{name: string}) {
    return <div className="mr-2 relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-300 rounded-full dark:bg-gray-600">
        <span className="font-medium text-gray-600 dark:text-gray-300 text-xl">{name[0].toUpperCase()}</span>
        </div>
    
}