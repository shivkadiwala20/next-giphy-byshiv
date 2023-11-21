"use client";

import AuthForm from "@/components/AuthForm";
import Header from "@/components/Header";
import Loader from "@/components/Loader";
import Paginator from "@/components/Paginator";
import SearchBar from "@/components/SearchBar";
import Tile from "@/components/Tile";
import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState, useCallback } from "react";
import ReactModal from "react-modal";

export default function Home() {
  const [gifs, setGifs] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [user, setUser] = useState();
  const [pagData, setPagData] = useState();
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const query = useCallback(
    async (prompt) => {
      let url = `https://api.giphy.com/v1/gifs/trending?api_key=${process.env.NEXT_PUBLIC_GIPHY_KEY}&limit=12&offset=${offset}`;

      if (prompt && typeof prompt === "string" && prompt.trim().length !== 0) {
        url = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.NEXT_PUBLIC_GIPHY_KEY}&q=${prompt}&limit=12&offset=${offset}`;
      }

      setIsLoading(true);
      const response = await fetch(url);

      const jsonData = await response.json();
      const gifs = jsonData.data.map((d) => {
        return {
          title: d.title,
          url: d.embed_url,
          username: d.username,
          orientation:
            d.images.original.width - d.images.original.height > 40
              ? "horizontal"
              : "vertical",
        };
      });
      setGifs(gifs);
      setIsLoading(false);
      setPagData(jsonData.pagination);
    },
    [offset]
  );

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  useEffect(() => {
    const func = async () => {
      if (user) {
        const docUser = await getDoc(doc(db, "users", user.email));
        setFavorites(docUser.data().favorites);
      }
      query();
    };

    func();
  }, [query, user]);

  useEffect(() => {
    document.body.style.overflowY = "hidden";
    if (user) {
      document.body.style.overflowY = "scroll";
    }
  }, [user]);

  useEffect(() => {
    if (showFavorites) {
      setGifs(favorites);
    } else {
      query();
    }
  }, [showFavorites]);

  return (
    <>
      <ReactModal isOpen={!user} ariaHideApp={false}>
        <AuthForm />
      </ReactModal>
      <div className="mb-20">
        <Header
          showFavorites={showFavorites}
          setShowFavorites={setShowFavorites}
          name={user && user.name}
        />
        <div className="bg-white rounded-2xl p-4">
          <SearchBar
            handleSearch={query}
            setOffset={setOffset}
            offset={offset}
            clear={showFavorites}
            showFavorites={setShowFavorites}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 items-center">
            {isLoading ? (
              <Loader />
            ) : (
              gifs.map((gif) => (
                <Tile
                  key={gif.url}
                  gif={gif}
                  favorites={favorites}
                  setFavorites={setFavorites}
                />
              ))
            )}
          </div>
          {!showFavorites && (
            <Paginator data={pagData} offset={offset} setOffset={setOffset} />
          )}
        </div>
      </div>
    </>
  );
}
