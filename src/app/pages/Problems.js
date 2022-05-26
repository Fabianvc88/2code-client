import React, { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import DynamicTable from "../components/DynamicTable";
import axios from "axios";

export default function Problems() {
  const [code, setCode] = useState(
    `#include "stdio.h"\r\rint add(a, b) {\n   \n}`
  );
  const url = "http://localhost:5000/api/problem/";

  const gerAllProblems = () => {
    console.log("Code is: ", code);
    axios.get(url).then((res) => console.log(res));
  };

  return (
    <div className="bg-perl flex h-screen flex-col items-center">
      <header className="w-full">
        <Navbar />
      </header>

      {/**Body */}
      <div className="flex h-full w-full flex-col gap-10 sm:p-10">
        <DynamicTable />
      </div>
      <Footer />
    </div>
  );
}
