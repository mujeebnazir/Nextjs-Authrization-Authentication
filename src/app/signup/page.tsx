"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(false);

  const [loading, setLoading] = React.useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success", response.data);
      router.push("/login");
    } catch (error: any) {
      console.log("Signup failed ", error.message);
      toast.error(error.message); //assignment
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="bg-gray-400 flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl pb-2 text-slate-800">
        {loading ? "Processing" : "Signup"}
      </h1>
      <hr />
      <div className=" shadow-lg shadow-gray-700/40 drop-shadow-xl bg-white justify-center p-5 rounded-md border-slate-300 border-2 flex flex-col">
        <label htmlFor="username">Username</label>
        <input
          className="h-8 focus:h-9  border-black p-2 border rounded-lg mb-4 focus:outline-none focus:border-gray-600"
          id="username"
          type="text"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="username"
        />
        <label htmlFor="email">Email</label>
        <input
          className="border h-8 focus:h-9 border-black p-2  rounded-lg mb-4 focus:outline-none focus:border-gray-600"
          id="email"
          type="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="email"
        />
        <label htmlFor="password">Password</label>
        <input
          className="border h-8 focus:h-9 border-black p-2 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
          id="password"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="password"
        />
        <button
          onClick={onSignup}
          className="text-xl shadow-lg shadow-slate-700/40 bg-gray-500 hover:bg-gray-400  rounded-lg   p-2 border border-gray-300  mb-4 focus:outline-none focus:border-gray-600"
        >
          {buttonDisabled ? "No Signup" : "Signup"}
        </button>
      </div>

      <div className="mt-5 max-w-md text-xl p-2 hover:bg-slate-700  bg-gray-500  rounded  mb-4 focus:outline-none focus:border-gray-600">
        <Link className="text-sm" href="/login">
          Login Here
        </Link>
      </div>
    </div>
  );
}
