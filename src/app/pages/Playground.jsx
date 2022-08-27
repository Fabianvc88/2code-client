import React from "react";
import { Outlet } from "react-router-dom";

function Playground() {
  // <div className="bg-perl flex h-screen flex-col">
  //     <header className="w-full">
  //       <Navbar />
  //     </header>

  //     {/**Body */}
  return <Outlet />;
}

export default Playground;
