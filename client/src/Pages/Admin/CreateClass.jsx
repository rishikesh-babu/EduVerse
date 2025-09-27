import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function CreateClass() {
    const navigate = useNavigate()

    const [className, setClassName] = useState("");
    function handleSubmit () {
        if(!className)retu
    }
    return (
        <div className="max-w-md  mx-auto mt-24 mb-24 bg-white rounded-xl shadow-2xl p-8 ">
            <div className='text-2xl font-bold text-center py-4'>Create Class</div>
            <form onSubmit="" className="space-y-6 w-full">
                <div className='mt-4'>
                    <label className="block   font-medium text-gray-700 mb-2 text-md">Class <span className='text-red-500 text-md'>*</span></label>
                    <input
                        type="text"
                        name="class"
                        value={className}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none className border-gray-300"
                        placeholder='Enter the class name'
                    />

                </div>
                <div className='flex justify-between gap-4 mt-4'>

                    <button
                        type="cancel"
                        onClick={() => navigate('/admin/dashboard')}
                        className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Create Class
                    </button>
                </div>
            </form>
        </div>
    )
}
