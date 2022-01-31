import React from 'react';
import { NavLink } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Logo(props) {
  return (
    <NavLink 
    to="/" 
    className='flex text-3xl font-bold text-sky-500 tracking-tighter'>
      {/* Logo */}
      2
      <p className='tracking-normal'>C</p>
      <p className={classNames(props.adaptive ? 'hidden md:block' : 'block', 
      'text-3xl text-gray-700 tracking-normal'
      )}
    >
      ode
    </p>
    </NavLink>
  );
}
