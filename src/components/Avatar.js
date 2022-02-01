import React from "react";

export default function Avatar({ url, ...rest }) {
  return (
    <img
      {...rest}
      className="h-9 rounded-full border-[3px] border-gray-300 cursor-pointer transition duration-150 transform hover:scale-110"
      loading="lazy"
      src={url}
      alt="profile picture"
    ></img>
  );
}
