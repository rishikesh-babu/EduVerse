import React from 'react'
import AdminNavBar from '../Components/Admin/AdminNavBar'
import Footer from '../Components/User/Footer'
import { Outlet } from 'react-router-dom'
import { SiderBar } from '../Components/Admin/SiderBar'

export default function AdminLayout() {

  return (
    <div className='min-h-screen overflow-x-hidden'>
      <AdminNavBar />
      <main className='flex  flex-grow ml-auto w-full transition-all duration-300'>
        <div>

          <SiderBar />
        </div>
        <div className='mt-16 w-full min-h-[80vh]'>
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  )
}
