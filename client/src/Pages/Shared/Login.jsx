import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../Config/AxiosInstance'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { saveUserData } from '../../redux/features/userSlice'


export default function Login() {

    const { isUserAuth, userData } = useSelector((state) => state.user)
    const dispatch = useDispatch()

    const navigate = useNavigate()
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    })
    const [formErrors, setFormErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!validateForm()) return

        setIsSubmitting(true)

        toast.promise(
            axiosInstance({
                method: 'POST',
                url: '/user/login',
                data: credentials
            })
                .then((res) => {
                    console.log('res :>> ', res);
                    console.log('res?.data?.message :>> ', res?.data?.message);
                    toast.success(res?.data?.message)
                    dispatch(saveUserData(res?.data?.data));
                    res?.data?.data?.role === "admin" ? navigate("/admin") : navigate("/")

                })
                .catch((err) => {
                    console.log('err :>> ', err);
                    console.log('err.response?.data?.message :>> ', err?.response?.data?.message);
                    toast.error(err?.response?.data?.message || 'Something went wrong')
                }),
            {
                pending: 'Logging in...',
            }
        )

    }
    const validateForm = () => {
        const errors = {}
        if (credentials.email && !/\S+@\S+\.\S+/.test(credentials.email)) {
            errors.email = 'Email is invalid'
        }
        if (!credentials.email.trim()) errors.email = 'Email is required'
        if (!credentials.password.trim()) errors.password = 'Password is required'
        setFormErrors(errors)
        return Object.keys(errors).length === 0
    }


    const getClassName = (fieldName) => {
        return `w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${formErrors[fieldName] ? 'border-red-500' : 'border-gray-300'
            }`
    }

    return (
        <div className="max-w-md mx-auto mt-24 bg-white rounded-xl shadow-2xl p-8">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Login</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email <span className='text-red-500 text-md'>*</span></label>
                    <input
                        type="text"
                        name="email"
                        value={credentials.email}
                        onChange={handleChange}
                        className={getClassName('email')}
                    />
                    {formErrors.email && (
                        <p className="text-sm text-red-600 mt-1">{formErrors.email}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                        className={getClassName('password')}
                    />
                    {formErrors.password && (
                        <p className="text-sm text-red-600 mt-1">{formErrors.password}</p>
                    )}
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Login
                </button>
            </form>

            <div className="mt-6 text-center">
                <p className="text-gray-600">Don't have an account?</p>
                <button
                    onClick={() => navigate('/signup')}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                >
                    Register here
                </button>
            </div>
        </div>
    )
}


