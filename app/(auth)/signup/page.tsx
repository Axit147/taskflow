"use client";

import signup from "@/lib/signup";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const page = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstName, setfirstName] = useState<string>("");
  const [lastName, setlastName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const router = useRouter();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: () => signup({ email, password, firstName, lastName, phone }),
    onSuccess: (data) => {
      if (data.error) {
        return toast.error(data.error.detail);
      }

      toast.success("Account created successfully...");
      router.push("/login");
    },
  });

  return (
    <div className="my-32 max-w-md mx-auto bg-white/10 p-6 rounded-xl">
      <div className="text-2xl font-bold text-center w-full mb-8 text-blue-400">
        Create Account
      </div>
      <form className="flex flex-col gap-4">
        <div className="flex justify-end gap-3 items-center">
          <span className="w-24">Firsh Name :</span>
          <input
            className="border border-slate-500 rounded flex-1 px-1.5 py-0.5 bg-transparent"
            type="text"
            name="firstName"
            value={firstName}
            onChange={(e) => setfirstName(e.target.value)}
          />
        </div>
        <div className="flex justify-end gap-3 items-center">
          <span className="w-24">Last Name :</span>
          <input
            className="border border-slate-500 rounded flex-1 px-1.5 py-0.5 bg-transparent"
            type="text"
            name="lastName"
            value={lastName}
            onChange={(e) => setlastName(e.target.value)}
          />
        </div>
        <div className="flex justify-end gap-3 items-center">
          <span className="w-24">Email :</span>
          <input
            className="border border-slate-500 rounded flex-1 px-1.5 py-0.5 bg-transparent"
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex justify-end gap-3 items-center">
          <span className="w-24">Phone :</span>
          <input
            className="border border-slate-500 rounded flex-1 px-1.5 py-0.5 bg-transparent"
            type="text"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="flex justify-end gap-3 items-center">
          <span className="w-24">Password :</span>
          <input
            className="border border-slate-500 rounded flex-1 px-1.5 py-0.5 bg-transparent"
            type="text"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          disabled={
            isPending ||
            email === "" ||
            phone === "" ||
            firstName === "" ||
            lastName === "" ||
            password === ""
          }
          onClick={async (e) => {
            e.preventDefault();
            try {
              toast.promise(mutateAsync(), {
                loading: "Creating Account...",
                success: <b>Executed!</b>,
                error: <b>Could not create.</b>,
              });
            } catch (error) {
              console.log(error);
            }
          }}
          className={`disabled:opacity-60 bg-blue-600 rounded-lg text-lg font-bold p-2 mt-2 hover:bg-blue-400 duration-200 w-1/2 mx-auto`}
        >
          Signup
        </button>
      </form>
      <div className="mt-6 text-sm opacity-75">
        Already have an account? |{" "}
        <Link href={"/login"} className="text-violet-400 font-semibold">
          Login
        </Link>
      </div>
    </div>
  );
};

export default page;
