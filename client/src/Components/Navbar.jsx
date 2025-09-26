import React, { useState } from 'react'
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 flex sm:flex-col w-full h-16  bg-white shadow-md z-40">

      <div className="h-full flex justify-center items-center p-0">
        <img
          src="/EduVerse.png"
          alt="Logo"
          className="w-36 h-20"
        />
      </div>
      <div className="flex-1 flex items-center justify-end px-4">

        <nav
          className=" absolute sm:flex gap-8 items-center top-4 z-50" >
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
