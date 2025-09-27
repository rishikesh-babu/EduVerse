import React from 'react'
import { Link } from 'react-router-dom'


export const SiderBar = () => {

    const sideBarContents = [
        {
            link: '/admin/dashboard',
            label: 'Class'
        },
        {
            link: '/admin',
            label: 'Subject'
        },
        {
            link: '/admin/createclass',
            label: 'Create Class'
        },
        {
            link: '/admin',
            label: 'Create Subject'
        },
    ]
    return (
        <div>
            <div className="w-56 min-h-screen bg-transparent shadow-md px-6 py-20 space-y-4 sticky bottom-0 hidden md:block">
            </div>

            <div className="fixed w-56 min-h-screen bg-white shadow-md px-6 py-20 mt-4 space-y-4 top-0 left-0 bottom-0 z-30 overflow-y-auto hide-scrollbar">
                {sideBarContents.map((item, index) => (
                    <Link
                        to={item.link}
                        className="p-2 flex items-center gap-2 transition-all duration-200 hover:bg-gray-400 active:bg-gray-500 dark:active:bg-gray-600 dark:hover:bg-gray-700 rounded-md"
                        key={index}

                    >
                        {item.element}
                        <span>{item.label}</span>
                    </Link>
                ))}
            </div>
        </div>
    )
}
