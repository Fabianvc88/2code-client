import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Playground() {
  // <div className="bg-perl flex h-screen flex-col">
  //     <header className="w-full">
  //       <Navbar />
  //     </header>

  //     {/**Body */}
  return <Outlet />;
}

export default Playground;
