import React from 'react'
import { Outlet } from 'react-router-dom'

export default function UserLayout() {
  return (
    <div>
        header 
        <Outlet />
        footer 
    </div>
  )
}
