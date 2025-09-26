import React from 'react'
import { SiderBar } from './SiderBar';
import { useState } from 'react';

export default function AdminNavBar() {
    const [open, setOpen] = useState(false);

    return (
        <>

            <div className="fixed top-0 left-0 flex w-full bg-white shadow-md z-20 justify-between">

                <div className='flex justify-end'>


                    <button
                        onClick={() => setOpen(!open)}
                        className="p-2 bg-none focus:outline-none text-black font-bold text-lg"
                    >
                        {open ? <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="w-8 h-8"
                        >
                            <path
                                d="M6 18 18 6M6 6l12 12"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                            : <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                className="w-8 h-8"
                            >
                                <path
                                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>}
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
            {open && (<SiderBar />)}
        </>
    )
}
