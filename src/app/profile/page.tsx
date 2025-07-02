"use client";
import axios from "axios";
import Link from "next/link";
import React, {useState} from "react";

import {toast} from "react-hot-toast";
import {useRouter} from "next/navigation";


export default function ProfilePage() {
    const router = useRouter()
    const [data, setData] = useState("nothing")
    const logout = async () => {
        try {
            await axios.get('/api/users/logout')
            toast.success('Logout successful')
            router.push('/login')
        } catch (error:any) {
            console.log(error.message);
            toast.error(error.message)
        }
    }

    const getUserDetails = async () => {
        const res = await axios.get('/api/users/me')
        console.log(res.data);
        setData(res.data.data._id)
    }

    return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen py-10 px-4 bg-gradient-to-br from-pink-100 via-rose-100 to-purple-100 animate-fade-in text-center">
        <h1 className="text-4xl font-extrabold text-pink-600 mb-2">💖 Profile</h1>
        <p className="text-pink-500 text-lg mb-4">Welcome to your sparkly space ✨</p>

        <h2 className="p-2 mb-4 rounded-xl bg-green-100 text-green-700 font-semibold text-sm shadow-sm">
          {data === "nothing" ? "🌸 Nothing" : <Link href={`/profile/${data}`}>🌼 View Profile ID: {data}</Link>}
        </h2>

        <div className="flex flex-col gap-4">
          <button
            onClick={logout}
            className="bg-gradient-to-r from-pink-400 to-purple-400 text-white font-bold py-2 px-6 rounded-full shadow-md hover:opacity-90 transition"
          >
            🚪 Logout
          </button>

          <button
            onClick={getUserDetails}
            className="bg-gradient-to-r from-rose-300 to-pink-400 text-white font-bold py-2 px-6 rounded-full shadow-md hover:opacity-90 transition"
          >
            📋 Get User Details
          </button>
        </div>
      </div>
    </>
  );
}