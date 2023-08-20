"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);

  const [loading, setLoading] = React.useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("login success", response.data);
      toast.success("login success");
      router.push("/profile");
    } catch (error: any) {
      console.log("Login failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(true);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  return (
    <div className="flex bg-gray-400 flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl pb-2 text-slate-800">
        {loading ? "Processing " : "Login"}
      </h1>
      <hr />
      <div className="shadow-lg shadow-gray-700/40 drop-shadow-xl bg-white justify-center p-5 rounded-md border-slate-300 border-2 flex flex-col">
        <label htmlFor="email">Email</label>
        <input
          className="overflow-hidden p-2 border h-8 focus:h-9 border-black rounded mb-4 focus:outline-none focus:border-gray-600"
          id="email"
          type="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="email"
        />
        <label htmlFor="password">Password</label>
        <input
          className="p-2 border h-8 focus:h-9 border-black rounded mb-4 focus:outline-none focus:border-gray-600"
          id="password"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="password"
        />
        <button
          onClick={onLogin}
          className="text-xl p-2 border shadow-lg shadow-slate-700/40 bg-gray-500 hover:bg-gray-400  rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        >
          Login
        </button>
      </div>

      <div className="mt-3">
        <Link className=" underline underline-offset-4" href="/forgotpassword">
          Forgot Password
        </Link>
      </div>
      <div className="mt-4 max-w-md text-xl p-2 hover:bg-slate-700  bg-gray-500  rounded  mb-4 focus:outline-none focus:border-gray-600">
        <Link className="text-sm" href="/signup">
          Signup Here
        </Link>
      </div>
    </div>
  );
}
