"use client";
import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app, db } from "@/firebase";
import { ToastContainer, toast } from "react-toastify";
import { doc, getDoc } from "firebase/firestore";

const SignIn = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(getAuth(app), form.email, form.password)
      .then(async (authUser) => {
        toast.success("Login Successfull");
        const user = await getDoc(doc(db, "users", authUser.user.email));
        localStorage.setItem("user", JSON.stringify(user.data()));
        location.reload();
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const [form, setForm] = useState({});

  return (
    <>
      <form
        className="w-full flex flex-col gap-4 border-slate-200 border-2 rounded-lg p-4"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Email"
          className="text-md md:text-lg border-b-2 outline-none focus:border-blue-400 transition-all"
          required
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="text-md md:text-lg border-b-2 outline-none focus:border-blue-400 transition-all"
          required
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button className="mt-4 bg-black text-white rounded-lg p-2">
          Sign In
        </button>
      </form>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default SignIn;
