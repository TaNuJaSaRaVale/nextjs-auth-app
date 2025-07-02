'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from "axios";
import toast from 'react-hot-toast';

export default function SignupPage(){
  const router = useRouter();
  const [user , setuser] = React.useState({
        email:"",
        username:"",
        password:"",
    })

    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading ,setloading] = React.useState(false);

    const onSignup = async()=>{
      try {
        setloading(true);
        const response =await axios.post("/api/users/signup", user);
        console.log("Signup successful:", response.data);
        router.push("/login");
      } catch (error:any) {
        console.log("Error during signup:", error.message);
        toast.error(error.message || "An error occurred during signup");
        
      }finally{
        setloading(false);

      }

    }

    useEffect(()=>{
      if(user.email.length > 0 && user.username.length > 0 && user.password.length > 0){
        setButtonDisabled(false);
      }else{
        setButtonDisabled(true);
      }
    },[user])

return (
  <div className="flex flex-col items-center justify-center min-h-screen py-8 bg-gradient-to-br from-pink-100 via-rose-100 to-purple-100 animate-fade-in">
    <h1 className="text-4xl font-extrabold text-pink-600 mb-4 tracking-wide">🌸{loading ? "Signing Up..." : "Sign Up"}</h1>
    <hr className="w-1/3 border-pink-300 mb-6" />

    <div className="bg-white p-8 rounded-3xl shadow-2xl w-80 border border-pink-200 transition-all duration-300 ease-in-out">
      <label htmlFor="username" className="block text-pink-700 font-medium mb-1">
        👩‍💼 Username:
      </label>
      <input
        className="w-full mb-4 p-3 rounded-full border-2 border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400 placeholder-pink-300 transition"
        type="text"
        id="username"
        placeholder="Enter your username"
        value={user.username}
        onChange={(e) => setuser({ ...user, username: e.target.value })}
      />

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
        onClick={onSignup}
      >
         {buttonDisabled ? "Signing Up..." : "Sign Up"}
      </button>
      <Link href="/login" className="block text-center mt-4 text-pink-600 hover:underline">
        Already have an account? Log in
      </Link>
    </div>
  </div>
);
}