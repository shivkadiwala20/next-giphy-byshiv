import React from "react";

function Paginator({ data, offset, setOffset }) {
  if (!data || data.total_count <= data.count) {
    return undefined;
  }

  const max = data.total_count;
  const page_size = 12;

  return (
    <div className="w-full flex items-center justify-center gap-8 my-2 mt-4">
      <p
        onClick={() => {
          offset !== 0 && setOffset(offset - page_size);
        }}
        className={`cursor-pointer ${offset === 0 && "opacity-50"}`}
      >
        &larr;
      </p>
      <p>{offset > 0 ? offset / page_size : ""}</p>
      <p className="font-bold scale-110 transition-all">
        {offset / page_size + 1}
      </p>
      <p>
        {offset + page_size <= max ? (offset + page_size) / page_size + 1 : ""}
      </p>
      <p
        onClick={() => {
          offset + page_size <= max && setOffset(offset + page_size);
        }}
        className={`cursor-pointer ${offset + page_size > max && "opacity-50"}`}
      >
        &rarr;
      </p>
    </div>
  );
}

export default Paginator;
