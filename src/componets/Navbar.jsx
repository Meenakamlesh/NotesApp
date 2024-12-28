import React from 'react'
import { NavLink } from 'react-router-dom'
import Notes from './Notes'
import './Home.css'


const Navbar = () => {
  return (
    <div className='navbar bg-gray-900'>
      <NavLink to="/" className='navbar-home text-white'>
        Home
      </NavLink>
      <NavLink to="/notes" className='navbar-notes  text-white'>
        Notes
      </NavLink>
    </div>
  )
}

export default Navbar