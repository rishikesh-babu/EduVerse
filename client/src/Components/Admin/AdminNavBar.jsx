import React from 'react'
import { SiderBar } from './SiderBar';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { toggleSideBar } from '../../redux/features/sideBarSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function AdminNavBar({ children }) {
    const location = useLocation()
    const dispatch = useDispatch()
    let sidebar = useSelector((state) => state.SiderBar)

    return (
        <>
            <div className="w-full bg-white shadow-md px-4 py-3 flex items-center justify-between z-50">
                <div className='flex justify-between items-center'>
                    <div className="flex-1 sm:flex justify-start items-center">
                        <img
                            src="/EduVerse.png"
                            alt="Logo"
                            className="h-[4.5rem] object-contain"
                        />
                    </div>
                </div>
            </div>

        </>
    )
}