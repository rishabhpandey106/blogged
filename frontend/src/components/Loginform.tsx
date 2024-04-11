import { SigninInput } from '@rishabhpandey106/blog-common';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DOMAIN } from '../config';
import axios from 'axios';

const LoginForm = () => {
  const navigate = useNavigate();

  const [postinput , setpostinput] = useState<SigninInput>({
    email: "",
    password: ""
  })

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    console.log(postinput.email, postinput.password);

    try {
      const res = await axios.post(`${DOMAIN}/api/v1/user/signin`, postinput)
      console.log(res.data.data);
      const token = res.data.data;
      localStorage.setItem("token", token);
      navigate("/blogs")
    } catch (error:any) {
      console.log(error);
    }

  };

  return (
    <div className="flex justify-center flex-col items-center h-screen bg-orange-200">
      <form className="bg-orange-300 p-8 rounded shadow-md w-80 lg:w-96" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4">Sign In your Account</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            className="mt-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-orange-200 p-2"
            value={postinput.email}
            placeholder='name@name.com'
            onChange={(e) => {
              setpostinput({
                ...postinput,
                email: e.target.value
              })
            }}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            className="mt-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-orange-200 p-2"
            value={postinput.password}
            placeholder='your password'
            onChange={(e) => {
              setpostinput({
                ...postinput,
                password: e.target.value
              })
            }}
            required
          />
        </div>
        <button type="submit" className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition duration-300">Sign In</button>
      </form>
      <h2 className='py-5 flex justify-center text-orange-400 text-xl font-extrabold'>Don't have an account? <Link className='pl-2 underline text-orange-500' to={"/signup"}>Signup</Link> </h2>
    </div>
  );
};

export default LoginForm;
