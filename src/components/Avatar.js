import React from "react";

export default function Avatar({ url, ...rest }) {
  return (
    <img
      {...rest}
      className="h-9 transform cursor-pointer rounded-full border-[3px] border-gray-300 transition duration-150 hover:scale-110 hover:border-[3px] hover:border-sky-500"
      loading="lazy"
      src={url}
      alt="profile picture"
    ></img>
  );
}
