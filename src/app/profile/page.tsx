"use client";
import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("logot sucess");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    console.log(res.data);
    setData(res.data.data._id);
  };
  return (
    <div className="bg-gray-400 flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl pb-2 text-slate-800">Profile</h1>
      <hr />

      <div className="shadow-lg shadow-gray-700/40 drop-shadow-xl bg-white justify-center p-5 rounded-md border-slate-300 border-2 flex flex-col">
        <div>
          <p className="text-slate-800">Profile page</p>
          <h2 className="p-1 rounded bg-gray-500 border-black ">
            {data == "nothing" ? (
              "Nothing"
            ) : (
              <Link href={`/profile/${data}`}>{data}</Link>
            )}
          </h2>
        </div>

        <div className="">
          <button
            onClick={logout}
            className="border-2 shadow-lg shadow-slate-700/40 bg-gray-500 hover:bg-slate-700 mt-4  text-slate-800 font-bold py-2 px-4 rounded mx-1 border-black border-spacing-1"
          >
            Logout
          </button>
          <button
            onClick={getUserDetails}
            className="border-2 shadow-lg shadow-slate-700/40 bg-gray-500 hover:bg-slate-700 mt-4 text-slate-800 font-bold py-2 px-4 rounded border-black"
          >
            getUserDetails
          </button>
        </div>
      </div>
    </div>
  );
}
