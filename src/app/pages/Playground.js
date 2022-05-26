import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Playground() {
  return (
    <div className="bg-perl flex h-screen flex-col">
      <header className="w-full">
        <Navbar />
      </header>

      {/**Body */}
      <Outlet />
      <Footer />
    </div>
  );
}

export default Playground;
