import React from 'react'

export default function Dashboard() {
  return (
    <div className='bg-gray-300'>
      <div className='w-1/3'>
        <ul class="flex border-b">
          <li class="-mb-px mr-1">
            <a class="bg-gray-300 inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-700 font-semibold" href="#">Active</a>
          </li>
          <li class="mr-1">
            <a class="bg-gray-300 inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold" href="#">Tab</a>
          </li>
          <li class="mr-1">
            <a class="bg-gray-300 inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold" href="#">Tab</a>
          </li>
          <li class="mr-1">
            <a class="bg-gray-300 inline-block py-2 px-4 text-gray-400 font-semibold" href="#">Tab</a>
          </li>
        </ul>
      </div>
      
      <div className='p-12 w-full  md:w-1/3 bg-red-200'>
        <p className='py-5 font-bold '>Titulo del ejercicio</p>
        <p className=''>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Gravida neque convallis a cras semper. Diam donec adipiscing tristique risus nec feugiat. Lectus quam id leo in vitae turpis massa.</p>
      </div>
    </div>
  )
}
