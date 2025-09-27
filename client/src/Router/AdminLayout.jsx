import React from 'react'
import AdminNavBar from '../Components/Admin/AdminNavBar'
import Footer from '../Components/User/Footer'
import { Outlet } from 'react-router-dom'
import { SiderBar } from '../Components/Admin/SiderBar'

export default function AdminLayout() {
    return (
        <div className='min-h-screen overflow-x-hidden flex'>
            <SiderBar />
            <main className='flex flex-col flex-grow ml-auto w-full transition-all duration-300'>
                <AdminNavBar />
                <div className='mt-16'>
                    <Outlet />
                </div>
                <Footer />
            </main>
        </div>
    )
}
