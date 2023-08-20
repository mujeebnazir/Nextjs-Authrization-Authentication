"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function UpdatePassword() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [password, setPassword] = React.useState("");

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  const updatepass = async () => {
    try {
      console.log(token, password);
      await axios.post("/api/users/updatepassword", { token, password });
      router.push("/login");
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  return (
    <div className="bg-gray-400 text flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl text-slate-700 py-2">Update Password</h1>

      <div className="shadow-lg shadow-gray-700/40 drop-shadow-xl bg-white justify-center p-5 rounded-md border-slate-300 border-2 flex flex-col">
        <label htmlFor="password">Password</label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="New Password"
        />
        <button
          onClick={updatepass}
          className="bg-gray-500 hover:bg-slate-700 p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        >
          Update
        </button>
      </div>
    </div>
  );
}
