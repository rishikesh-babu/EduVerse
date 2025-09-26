import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <div className=" bottom-0 left-0 w-full bg-gray-700  text-white px-6 py-4  text-center text-sm">
            <div className='flex w-full justify-center gap-5 '>
                <Link
                    to="/"
                    className="text-gray-300 md:text-lg font-semibold hover:text-blue-500"
                >
                    Home
                </Link>
                <Link
                    to="/about"
                    className="text-gray-200 md:text-lg font-semibold hover:text-blue-500"
                >
                    About Us
                </Link>
                <Link
                    to="/contact"
                    className="text-gray-200 md:text-lg font-semibold hover:text-blue-500"
                >
                    Contact Us
                </Link>
            </div>
            <div className="h-full flex justify-center items-center p-0">
                <img
                    src="/EduVerse.png"
                    alt="Logo"
                    className="w-40 h-24"
                />
            </div>
            <span className="ml-2 text-xs text-gray-400">
                <div
                    className="font-signature hover:text-blue-300"
                >
                    © 2025 CTRL_ALT_DFEAT. All rights reserved.
                </div>
            </span>
        </div>
    )
}
