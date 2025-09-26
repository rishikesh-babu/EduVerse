import React from 'react'
import AdminNavBar from '../Components/Admin/AdminNavBar'
import AdminFooter from '../Components/Admin/AdminFooter'
import { Outlet } from 'react-router-dom'

export default function AdminLayout() {
  return (
    <div>
        <AdminNavBar />
        <Outlet/>
        <AdminFooter/>
    </div>
  )
}
