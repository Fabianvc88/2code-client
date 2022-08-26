import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export function Main() {
  return (
    <div className="bg-perl flex h-screen flex-col ">
      <Navbar />
      <Outlet />
    </div>
  );
}
