import React from 'react'
import { NavLink } from 'react-router'

const Header = () => {
  return (
  <header className='container mx-auto py-4 px-6 flex items-center justify-between bg-gray-200 shadow-md'>
    <h1>Getsmarter</h1>

    <nav>
      <ul className='flex flex-row gap-4 items-center'>
        <li><NavLink className={({isActive})=> isActive ? "text-blue-800" : "text-black"} to="/home">Home</NavLink></li>
        <li><NavLink className={({isActive})=> isActive ? "text-blue-800" : "text-black"} to="/about">About</NavLink></li>
        <li><NavLink className={({isActive})=> isActive ? "text-blue-800" : "text-black"} to="/admin">Dashboard</NavLink></li>
        <li><NavLink className={({isActive})=> isActive ? "text-blue-800" : "text-black"} to="/authentification">Se Connecter</NavLink></li>
      </ul>
    </nav>
  </header>
  )
}

export default Header
