import React from "react";

export default function NotFoundPage() {
  return (
    <div className=" mt-20 flex flex-col items-center tracking-tighter">
      <div className=" flex gap-x-2 rounded-lg p-4 text-4xl font-medium">
        <p className="text-sky-600">404</p>
        <p>Not Found</p>
      </div>
      <p className=" text-2xl">La página que buscas no existe.</p>
    </div>
  );
}
