import React, { useState } from 'react'
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <header className="fixed top-0 left-0 flex w-full bg-white shadow-md">

            <div className="flex-1 sm:flex justify-center items-center">
                <img
                    src="/EduVerse.png"
                    alt="Logo"
                    className="h-[4.5rem] object-contain"
                />
            </div>

            <div className="px-4 flex justify-center items-center">
                <nav>
                    <Link
                        to="/login"
                        className="text-blue-500 px-4 py-1 ring ring-blue-500 rounded-2xl hover:bg-blue-600 hover:text-white"
                    >
                        Login
                    </Link>

                </nav>
            </div>
        </header>
    );
}
