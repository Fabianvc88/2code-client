import React from 'react';
import Navbar from '../components/Navbar';

export default function Dashboard() {

  return (
    <div className='flex flex-col h-screen'>
      <Navbar />

      {/**Body */}
      <div className='sm:h-screen sm:w-1/3 border border-red-600'>
        {/**Tabs */}
        <ul id="tabs" className="flex border-b space-x-0 ">
          <li className="inline-block py-2 px-4  hover:bg-gray-100 font-semibold"><a id="default-tab" href="first">Enunciado</a></li>
          <li className="inline-block py-2 px-4 hover:bg-gray-100 font-semibold"><a href="second">Menú</a></li>
          <li className="inline-block py-2 px-4 hover:bg-gray-100 font-semibold"><a href="third">Notas</a> </li>
          <li className="inline-block py-2 px-4 hover:bg-gray-100 font-semibold"><a href="fourth">Comentarios</a></li>
        </ul>

        {/**Tabs content*/} 
        <div id="tab-contents" className='w-full p-5 md:px-12'>
          <div id="first" className="">
            <p className='py-5 font-bold '>Titulo del ejercicio</p>
            <p className=''>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Gravida neque convallis a cras semper. Diam donec adipiscing tristique risus nec feugiat. Lectus quam id leo in vitae turpis massa.</p>
          </div>
          <div id="second" className="hidden ">
            Second tab
          </div>
          <div id="third" className="hidden ">
            Third tab
          </div>
          <div id="fourth" className="hidden ">
            Fourth tab
          </div>
        </div>
      </div>
      <div>
        
      </div>      
    </div>
  )
}


