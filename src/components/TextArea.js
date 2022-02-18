import React from "react";

export default function TextArea() {
  return (
    <div className="flex h-full w-full">
      <textarea
        name="codeinput"
        className=" h-full w-full resize-none p-3 outline-none"
      ></textarea>
    </div>
  );
}
