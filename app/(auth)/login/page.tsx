"use client";

import login from "@/lib/login";
import { userStore, useUser } from "@/lib/stores/useUser";
import { QueryClient, useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const updateUserToken = useUser((state: userStore) => state.updateUserToken);
  const user = useUser((state: userStore) => state.user);
  const router = useRouter();

  const queryClient = new QueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: () => login(email, password),
    onSuccess: async (data) => {
      if (data.error) throw toast.error(data.error);
      updateUserToken(data.token);
      router.replace("/dashboard");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  return (
    <div className="my-32 max-w-md mx-auto bg-white/10 p-6 rounded-xl">
      <div className="text-2xl font-bold text-center w-full mb-8 text-blue-400">
        Welcome Back!
      </div>
      <form className="flex flex-col gap-4">
        <div className="flex justify-end gap-3 items-center">
          <span className="w-20">Email :</span>
          <input
            className="border border-slate-500 rounded flex-1 px-1.5 py-0.5 bg-transparent"
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex justify-end gap-3 items-center">
          <span className="w-20">Password :</span>
          <input
            className="border border-slate-500 rounded flex-1 px-1.5 py-0.5 bg-transparent"
            type="text"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          onClick={async (e) => {
            e.preventDefault();
            try {
              toast.promise(mutateAsync(), {
                loading: "Logging In...",
                success: <b>Logged in successfully!</b>,
                error: <b>Could not login.</b>,
              });
            } catch (error) {
              console.log(error);
            }
          }}
          className="bg-blue-600 rounded-lg text-lg font-bold p-2 mt-2 hover:bg-blue-400 duration-200 w-1/2 mx-auto"
        >
          Login
        </button>
      </form>
      <div className="mt-6 text-sm opacity-75">
        Dont't have an account? |{" "}
        <Link href={"/signup"} className="text-violet-400 font-semibold">
          Signup
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
