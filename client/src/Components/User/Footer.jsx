import React from 'react'

export default function Footer() {
    return (
        <div className="absolute bottom-0 left-0 w-full bg-black text-white px-6 py-4 z-10 text-center text-sm">
            <span className="ml-2 text-xs text-gray-300">
                <div
                    className="font-signature hover:text-blue-300"
                >
                    © 2025 CTRL_ALT_DFEAT. All rights reserved.
                </div>
            </span>
        </div>
    )
}
