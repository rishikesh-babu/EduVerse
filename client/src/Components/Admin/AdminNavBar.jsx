import React from 'react'
import { SiderBar } from './SiderBar';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { toggleSideBar } from '../../redux/features/sideBarSlice';
import { useDispatch } from 'react-redux';

export default function AdminNavBar({ children }) {
    const location = useLocation()
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch()

    useEffect(() => {
        setOpen(false)
    }, [location.pathname])

    return (
        <>
            <div className="w-full bg-green-200 shadow-md px-4 py-3 flex items-center justify-between fixed top-0 z-40">
                <div className='flex justify-end'>
                    <button
                        onClick={() => dispatch(toggleSideBar())}
                        className="p-2 bg-none focus:outline-none text-black font-bold text-lg"
                    >
                        {open ? (
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8">
                                <path d="M6 18 18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        ) : (
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8">
                                <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        )}
                    </button>
                </div>

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