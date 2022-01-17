import React from 'react';
import { NavLink } from "react-router-dom";

export default function Nav() {
  return (
    <nav className=" bg-gray-600 text-white flex h-16 justify-around items-center">
      <h1>Logo</h1>
      <ul className='space-x-12'>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/about">About</NavLink>
      </ul>
    </nav>
  )
}
