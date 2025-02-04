"use client";

import ThemeToggle from "@/components/ThemeToggle";
import { userStore, useUser } from "@/lib/stores/useUser";
import { ArrowLeft, LogOut, Mail, User2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

const page = () => {
  const fetchUser = useUser((state: userStore) => state.fetchUser);
  const user = useUser((state: userStore) => state.user);
  const router = useRouter();

  const logOut = () => {
    localStorage.removeItem("user");
    toast.success("Logged out successfully!");
    fetchUser();
    router.replace("login");
  };

  return (
    <div className="rounded-lg shadow-sm p-6 space-y-6 bg-white dark:bg-gray-900 h-full overflow-y-auto">
      <div className="text-4xl font-bold bg-gradient-to-r to-sky-500 from-blue-600 w-max bg-clip-text text-transparent">
        Settings
      </div>

      <div className="text-xl pb-6">
        <div className="mb-3">
          {" "}
          👋 Hello,{" "}
          <span className="font-semibold italic text-2xl mb-4">
            {user?.firstName}
          </span>{" "}
        </div>
        <div className="ml-10 dark:text-slate-300 text-slate-500">
          <span className="flex items-center gap-2 text-lg">
            <User2 className="w-6 h-6" /> :{" "}
            {user?.firstName + " " + user?.lastName}
          </span>
          <span className="flex items-center gap-2 text-lg">
            <Mail className="w-6 h-6" /> : {user?.email}
          </span>
        </div>
      </div>
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <span className="text-xl flex gap-1 items-center">
            <ArrowLeft />
            Change App Theme
          </span>{" "}
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={logOut}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-red-800 dark:text-red-300 hover:bg-red-300 dark:hover:bg-red-700 
          transition-colors duration-200 ease-in-out"
          >
            <LogOut />
          </button>
          <span className="text-xl flex gap-1 items-center">
            <ArrowLeft />
            Log Out
          </span>
        </div>
      </div>
    </div>
  );
};

export default page;
