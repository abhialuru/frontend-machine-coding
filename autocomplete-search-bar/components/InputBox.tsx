"use client";
import { useEffect, useState } from "react";

function InputBox() {
  const [searchInput, setSearchInput] = useState("");
  const [receipes, setReceipes] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [cachedData, setCachedData] = useState<{ [key: string]: [] }>({});

  async function handleReceipes() {
    if (cachedData[searchInput]) {
      setReceipes(cachedData[searchInput]);
      return;
    }

    try {
      const res = await fetch(
        `https://dummyjson.com/recipes/search?q=${searchInput}`,
      );
      const data = await res.json();
      setReceipes(data?.recipes);
      setCachedData((prev) => ({ ...prev, [searchInput]: data?.recipes }));
    } catch (error: any) {
      console.log(error);
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      handleReceipes();
    }, 300);

    return () => clearTimeout(timer);
  }, [searchInput]);

  return (
    <div className="w-full h-screen flex justify-center pt-24">
      <div className="flex flex-col">
        <input
          type="text"
          className="w-120 p-3 pl-4 h-fit focus:outline-none outline-none rounded-full shadow-md shadow-zinc-300 border border-zinc-200"
          value={searchInput}
          name="search-box"
          placeholder="search any recipe"
          onChange={(e) => setSearchInput(e.target.value)}
          onFocus={() => setShowResults(true)}
          onBlur={() => setShowResults(false)}
        />
        {showResults && (
          <div className="w-120 max-h-80 border border-zinc-200 shadow-md shadow-zinc-400 flex flex-col py-4 overflow-y-scroll">
            {receipes &&
              receipes.length > 0 &&
              receipes.map((item: any, _) => (
                <span
                  key={item.id}
                  className="py-1 px-4 text-zinc-700 cursor-pointer hover:bg-zinc-200 "
                >
                  {item?.name}
                </span>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default InputBox;
