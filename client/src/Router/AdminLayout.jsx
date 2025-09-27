import React from 'react'
import AdminNavBar from '../Components/Admin/AdminNavBar'
import Footer from '../Components/User/Footer'
import { Outlet } from 'react-router-dom'
import { SiderBar } from '../Components/Admin/SiderBar'

export default function AdminLayout() {
  return (
    <div>
      <AdminNavBar />
      <div className='flex-1 mt-16'>
        <SiderBar /> <Outlet />
      </div>
      <Footer />
    </div>
  )
}
