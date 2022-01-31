import React, { useState, useContext } from "react";
import Navbar from "../components/Navbar";
import { logOut } from "../firebase";
import { AuthContext } from "../contexts/authContext";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const { currentUser } = useContext(AuthContext);

  async function handleSignOut() {
    console.log("logging out");
    setLoading(true);
    try {
      await logOut();
    } catch (e) {
      alert("Error loggin out");
    }
    setLoading(false);
  }

  return (
    <div className="flex flex-col h-screen items-center">
      <Navbar />
      Homepage
      <div>Currently logged in as: {currentUser?.email}</div>
      <button
        className="w-max border rounded-md px-4 py-2 my-4 text-white bg-red-500 hover:text-gray-100 hover:bg-red-700"
        onClick={handleSignOut}
        disabled={loading || !currentUser}
      >
        Sign out
      </button>
    </div>
  );
}
