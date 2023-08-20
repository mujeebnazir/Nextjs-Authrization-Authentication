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
      console.log(error.response.data);
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
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl text-slate-700 py-2">Verify Email</h1>
      <div className="shadow-lg shadow-gray-700/40 drop-shadow-xl bg-white justify-center p-5 rounded-md border-slate-300 border-2 flex flex-col">
        <h2 className="p-2 bg-gray-500 text-black rounded">
          {token ? `${token}` : "No Action"}
        </h2>

        {verified && (
          <div>
            <h2 className="text-2xl"> Email Verified!</h2>
            <Link href="/login">Login</Link>
          </div>
        )}
        {error && (
          <div>
            <h2 className="py-1 mt-1 px-1 text-xl text-white bg-slate-900 rounded">
              {" "}
              Error
            </h2>
          </div>
        )}
      </div>
    </div>
  );
}
