import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { app } from "@/firebase";
import Link from "next/link";

function Header({ showFavorites, setShowFavorites, name }) {
  return (
    <div className="w-full my-10 flex justify-between items-center">
      <Link href="/" className="text-lg md:text-3xl font-bold">
        Hello{name && `, ${name}`}
      </Link>
      <div className="flex items-center gap-4">
        <p
          className={`cursor-pointer p-2 rounded-2xl ${
            showFavorites && "bg-yellow-400"
          }`}
          onClick={() => setShowFavorites(!showFavorites)}
        >
          Favorites
        </p>
        <button
          className="bg-black p-2 text-white rounded-2xl"
          onClick={() => {
            signOut(getAuth(app));
            localStorage.removeItem("user");
            location.reload();
          }}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default Header;
