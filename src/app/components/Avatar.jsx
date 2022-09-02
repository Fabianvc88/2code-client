import React from "react";

export default function Avatar({ url, hidden }) {
  return (
    <img
      //hidden={hidden}
      className={`${
        hidden ? "hidden" : "block"
      } h-9 transform cursor-pointer rounded-full border-[3px] border-gray-300 transition duration-150 hover:scale-110 hover:border-[3px] hover:border-sky-500`}
      loading="lazy"
      src={url}
      alt="profile picture"
    ></img>
  );
}
