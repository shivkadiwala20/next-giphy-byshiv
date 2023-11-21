"use client";

import React, { useState } from "react";
import SignIn from "./SignIn";
import Register from "./Register";

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="w-full h-full flex flex-col items-center pt-[20%]">
      <div className="w-full md:w-1/3">
        <div className="flex justify-between align-bottom w-full p-4">
          <p
            className={
              isLogin ? "text-2xl font-bold transition-all" : "transition-all"
            }
            onClick={() => setIsLogin(true)}
          >
            Sign In
          </p>
          <p
            className={
              !isLogin ? "text-2xl font-bold transition-all" : "transition-all"
            }
            onClick={() => setIsLogin(false)}
          >
            Register
          </p>
        </div>
        {isLogin ? <SignIn /> : <Register />}
      </div>
    </div>
  );
}

export default AuthForm;
