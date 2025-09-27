import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearUserData } from '../../redux/features/userSlice';
export default function Navbar() {
    const { isUserAuth } = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const logOut = () => {
        dispatch( clearUserData())
    }
    return (
        <header className="fixed top-0 left-0 flex w-full bg-white shadow-md">

            <Link to={'/'} className="flex-1 sm:flex justify-center items-center">
                <img
                    src="/EduVerse.png"
                    alt="Logo"
                    className="h-[4.5rem] object-contain"
                />
            </Link>

            <div className="px-4 flex justify-center items-center">
                <nav>{isUserAuth ?
                    <button
                        onClick={logOut}
                        className="text-blue-500 px-4 py-1 ring ring-blue-500 rounded-2xl hover:bg-blue-600 hover:text-white"
                    >
                        Logout
                    </button>
                    : <Link
                        to="/login"
                        className="text-blue-500 px-4 py-1 ring ring-blue-500 rounded-2xl hover:bg-blue-600 hover:text-white"
                    >
                        Login
                    </Link>
                }
                </nav>
            </div>
        </header>
    );
}
