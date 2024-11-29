import React from 'react'

const Header = () => {
  return (
    <>
     <div className='flex justify-between p-3 bg-fuchsia-700 text-white'>
          <div>
            <span className='logo py-3 cursor-pointer hover:font-bold transition-all'>
                Todo App
            </span>
          </div>

          <div>
            <ul className='flex justify-between gap-7 px-4'>
                <li className='cursor-pointer hover:font-bold transition-all'>Home</li>
                <li className='cursor-pointer hover:font-bold transition-all'>Your Task </li>
            </ul>
          </div>
     </div>
    </>
  )
}

export default Header