"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.reponse.data);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-10 px-4 bg-gradient-to-br from-pink-100 via-rose-100 to-purple-100 animate-fade-in text-center">
      <h1 className="text-4xl font-extrabold text-pink-600 mb-4">
        📧 Verify Your Email
      </h1>

      <h2 className="p-3 mb-4 bg-pink-200 text-pink-800 font-semibold rounded-xl shadow-sm">
        🔑 Token: {token ? token : "🚫 No token found"}
      </h2>

      {verified && (
        <div className="mb-4">
          <h2 className="text-2xl text-green-600 font-bold mb-2">
            ✅ Email Verified Successfully!
          </h2>
          <Link
            href="/login"
            className="inline-block bg-gradient-to-r from-pink-400 to-purple-400 text-white font-bold py-2 px-6 rounded-full shadow-md hover:opacity-90 transition transform hover:scale-105"
          >
            🎀 Go to Login
          </Link>
        </div>
      )}

      {error && (
        <div className="mt-4">
          <h2 className="text-2xl bg-red-200 text-red-600 px-4 py-2 rounded-xl shadow">
            ❌ Verification Failed
          </h2>
        </div>
      )}
    </div>
  );
}
