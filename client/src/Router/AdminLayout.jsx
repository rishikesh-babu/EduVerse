import React from 'react'
import AdminNavBar from '../Components/Admin/AdminNavBar'
import Footer from '../Components/User/Footer'
import { Outlet } from 'react-router-dom'

export default function AdminLayout() {
  return (
    <div>
      <AdminNavBar />
      <div className='mt-16'>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}
