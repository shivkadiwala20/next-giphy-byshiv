"use client";
import React, { useEffect, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";

function SearchBar({
  handleSearch,
  setOffset,
  offset,
  clear = false,
  showFavorites,
}) {
  const [prompt, setPrompt] = useState("");

  useEffect(() => {
    const searchTimeout = setTimeout(() => {
      handleSearch(prompt);
      if (clear) {
        showFavorites(false);
      }
    }, [1000]);

    return () => {
      clearTimeout(searchTimeout);
    };
  }, [prompt, handleSearch]);

  useEffect(() => {
    if (offset !== 0) {
      handleSearch(prompt);
    }
  }, [offset]);

  useEffect(() => {
    if (clear && prompt.length !== 0) {
      setPrompt("");
    }
  }, [clear]);

  return (
    <form
      className="flex flex-col md:flex-row justify-between gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        setOffset(0);
        handleSearch(prompt);
      }}
    >
      <div className="bg-gray-200 h-16 w-full md:w-[80%] rounded-2xl flex flex-row items-center px-4 py-2">
        <FaMagnifyingGlass className="mr-4" size={"1.5rem"} />
        <input
          type="text"
          placeholder="Article Name or Keywords"
          className="flex-1 h-full bg-transparent font-medium text-sm md:text-lg outline-none"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
      </div>
      <button className="bg-black flex-1 text-white rounded-2xl">Search</button>
    </form>
  );
}

export default SearchBar;
