'use client';
import React , {useEffect} from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from "axios";
import toast from 'react-hot-toast';

export default function LoginPage(){
  const router = useRouter();
    const[user , setuser] = React.useState({
        email:"",
        password:"",
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const onLogin = async()=>{
      try {
        setLoading(true);
        const response = await axios.post("/api/users/login", user);
        console.log("Login successful:", response.data);
        toast.success("Login successful!");
        router.push("/profile");
      } catch (error:any) {
        console.log("Login failed:", error.message);
       toast.error( error.message);
        
      }finally {
        setLoading(false);
      }

    }

    useEffect(() => {
      if(user.email.length > 0 && user.password.length > 0){
        setButtonDisabled(false);
      }else{
        setButtonDisabled(true);
      }
    }, [user]);

return (
  <div className="flex flex-col items-center justify-center min-h-screen py-8 bg-gradient-to-br from-pink-100 via-rose-100 to-purple-100 animate-fade-in">
    <h1 className="text-4xl font-extrabold text-pink-600 mb-4 tracking-wide">💫 Welcome Back!</h1>
    <p className="text-pink-500 mb-6">{loading ? "Loading..." : "Login to your magical world"} ✨</p>

    <div className="bg-white p-8 rounded-3xl shadow-2xl w-80 border border-pink-200 transition-all duration-300 ease-in-out">
      <label htmlFor="email" className="block text-pink-700 font-medium mb-1">
        📧 Email:
      </label>
      <input
        className="w-full mb-4 p-3 rounded-full border-2 border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400 placeholder-pink-300 transition"
        type="email"
        id="email"
        placeholder="Enter your email"
        value={user.email}
        onChange={(e) => setuser({ ...user, email: e.target.value })}
      />

      <label htmlFor="password" className="block text-pink-700 font-medium mb-1">
        🔒 Password:
      </label>
      <input
        className="w-full mb-6 p-3 rounded-full border-2 border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400 placeholder-pink-300 transition"
        type="password"
        id="password"
        placeholder="Enter your password"
        value={user.password}
        onChange={(e) => setuser({ ...user, password: e.target.value })}
      />

      <button
        className="w-full bg-gradient-to-r from-pink-400 to-purple-400 text-white font-bold py-3 rounded-full hover:opacity-90 shadow-md transition transform hover:scale-105"
        onClick={onLogin}
      >
        🎀 {buttonDisabled ? "Loading..." : "Login"}
      </button>

      <p className="text-center text-pink-500 text-sm mt-4">
        Don’t have an account?{" "}
        <a href="/signup" className="text-pink-600 font-semibold underline hover:text-pink-700">
          Sign up 💕
        </a>
      </p>
    </div>
  </div>
);
}

