"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
  });

  const forgotPass = async () => {
    try {
      const response = await axios.post("/api/users/forgotpassword", user);
      console.log("Email Taken Sucessfully", response.data);
      router.push("/login");
    } catch (error: any) {
      console.log("Failed", error.message);
    }
  };
  return (
    <div className="bg-gray-400 text flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl text-slate-700 pb-2 justify-center">
        Forgot Password
      </h1>

      <div className="shadow-lg shadow-gray-700/40 drop-shadow-xl bg-white justify-center p-5 rounded-md border-slate-300 border-2 flex flex-col">
        <label htmlFor="email">Enter your Email</label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
          id="email"
          type="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Email"
        />
        <button
          onClick={forgotPass}
          className="bg-gray-500 hover:bg-slate-700 p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
