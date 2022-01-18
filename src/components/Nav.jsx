import React from 'react';
import { NavLink } from "react-router-dom";

export default function Nav() {
  return (
    <nav className=" bg-gray-600 text-white  flex h-16 justify-around items-center">
      <h1>2Code</h1>
      <ul className='space-x-12'>
        <NavLink className="hover:text-gray-300" to="/">Home</NavLink>
        <NavLink className="hover:text-gray-300" to="/dashboard">Dashboard</NavLink>
        <NavLink className="hover:text-gray-300" to="/about">About</NavLink>
        <NavLink className="hover:text-gray-300" to="/login">Login</NavLink>
      </ul>
    </nav>
  )
}
