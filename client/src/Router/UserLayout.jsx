import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Components/User/Navbar'
import Footer from '../Components/User/Footer'

export default function UserLayout() {
  return (
    <div>
      <Navbar />
      <div className='pt-19'>
        <Outlet />
      </div>
     <Footer/>
    </div>
  )
}
