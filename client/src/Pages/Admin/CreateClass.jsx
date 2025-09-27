import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'
import axiosInstance from '../../Config/AxiosInstance'
import { toast } from 'react-toastify'

export default function CreateClass() {
    const navigate = useNavigate()
    const [name, setName] = useState("");

    useEffect(() => {
        console.log(name)
    }, [name])

    async function handleSubmit(e) {
        e.preventDefault()
        if (!name.trim()) return

        toast.promise(
            axiosInstance({
                method: 'POST',
                url: '/class/create',
                data: { name }
            })
                .then((res) => {
                    console.log('res?.data', res?.data)
                    toast.success(res?.data?.message)
                })
                .catch((err) => {
                    console.log('err', err)
                    toast.error(err?.response?.data?.message)
                }),
            {
                pending: 'Creating...'
            }
        )
    }

    return (
        <div className="max-w-md  mx-auto mt-24 mb-24 bg-white rounded-xl shadow-2xl p-8 ">
            <div className='text-2xl font-bold text-center py-4'>Create Class</div>
            <form onSubmit={handleSubmit} className="space-y-6 w-full">
                <div className='mt-4'>
                    <label className="block   font-medium text-gray-700 mb-2 text-md">Class <span className='text-red-500 text-md'>*</span></label>
                    <input
                        type="text"
                        name="class"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
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
