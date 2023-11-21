import { db } from "@/firebase";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FaStar, FaRegStar } from "react-icons/fa6";
import Loader from "./Loader";

function Tile({ gif, favorites, setFavorites }) {
  const [aspect, setAspect] = useState("aspect-square");
  const [isLoading, setIsLoading] = useState(true);
  const isFavorite = favorites.filter((fav) => fav.url === gif.url).length > 0;

  const toggleFavorite = async () => {
    const document = doc(
      db,
      "users",
      JSON.parse(localStorage.getItem("user")).email
    );

    await updateDoc(document, {
      favorites: isFavorite === false ? arrayUnion(gif) : arrayRemove(gif),
    });

    if (isFavorite) {
      const index = favorites.findIndex((fav) => fav.url == gif.url);
      if (index > -1) {
        let newArr = [...favorites];
        newArr.splice(index, 1);
        setFavorites(newArr);
      }
    } else {
      setFavorites([...favorites, gif]);
    }
  };

  useEffect(() => {
    if (!isLoading) {
      setAspect(
        gif.orientation === "horizontal" ? "aspect-video" : "aspect-square"
      );
    }
  }, [isLoading, gif]);

  return (
    <div className={`w-full rounded-lg  relative ${aspect}`}>
      <iframe
        src={gif.url}
        width="100%"
        height="100%"
        className="rounded-lg"
        onLoad={() => setIsLoading(false)}
      ></iframe>

      {isLoading && <Loader />}
      <div className="absolute bottom-0 w-full flex flex-row justify-between items-center bg-gradient-to-b from-transparent to-black text-white p-2 rounded-lg">
        <div>
          <p className="text-md md:text-lg font-bold">{gif.title}</p>
          <p className="text-sm md:text-md font-thin">@{gif.username}</p>
        </div>
        {isFavorite ? (
          <FaStar
            size={"1.5rem"}
            color="gold"
            className="cursor-pointer hover:scale-125 transition-all"
            onClick={toggleFavorite}
          />
        ) : (
          <FaRegStar
            size={"1.5rem"}
            color="gold"
            className="cursor-pointer hover:scale-125 transition-all"
            onClick={toggleFavorite}
          />
        )}
      </div>
    </div>
  );
}

export default Tile;
