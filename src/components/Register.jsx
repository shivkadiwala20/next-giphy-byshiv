"use client";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { app, db } from "@/firebase";
import { doc, setDoc } from "firebase/firestore";

function Register() {
  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.password !== form.confirm) {
      toast.error("Password do not match");
      return;
    }

    createUserWithEmailAndPassword(getAuth(app), form.email, form.password)
      .then(async (authUser) => {
        toast.success("Success. The user is created in Firebase");
        const user = {
          name: form.name,
          email: authUser.user.email,
          favorites: [],
        };
        localStorage.setItem("user", JSON.stringify(user));
        await setDoc(doc(db, "users", authUser.user.email), user);
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
          placeholder="Name"
          className="text-md md:text-lg border-b-2 outline-none focus:border-blue-400 transition-all"
          required
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
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
        <input
          type="password"
          placeholder="Confirm Password"
          className="text-md md:text-lg border-b-2 outline-none focus:border-blue-400 transition-all"
          required
          onChange={(e) => setForm({ ...form, confirm: e.target.value })}
        />
        <button className="mt-4 bg-black text-white rounded-lg p-2">
          Register
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
}

export default Register;
