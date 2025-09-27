import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axiosInstance from '../../Config/AxiosInstance'
import { useDispatch } from 'react-redux'
import { saveUserData } from '../../redux/features/userSlice'

export default function Signup() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [formData, setFormData] = useState({
        first_name: '',
        middle_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        password: '',
        confirmPassword: '',
    })

    const [formErrors, setFormErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)

    const [passwordValidation, setPasswordValidation] = useState({
        hasUpperCase: false,
        hasLowerCase: false,
        hasNumber: false,
        hasSpecialChar: false,
        hasMinLength: false,
    })
    const [confirmPasswordValidation, setConfirmPasswordValidation] = useState({
        isSame: false
    })

    useEffect(() => {
        if (formData.password) {
            setPasswordValidation({
                hasUpperCase: /[A-Z]/.test(formData.password),
                hasLowerCase: /[a-z]/.test(formData.password),
                hasNumber: /[0-9]/.test(formData.password),
                hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(formData.password),
                hasMinLength: formData.password.length >= 8
            })
        } else {
            setPasswordValidation({
                hasUpperCase: false,
                hasLowerCase: false,
                hasNumber: false,
                hasSpecialChar: false,
                hasMinLength: false
            })
        }
    }, [formData.password])

    useEffect(() => {

        if (formData.password) {
            setConfirmPasswordValidation({
                isSame: formData.confirmPassword === formData.password ? true : false
            })
        } else {
            setConfirmPasswordValidation({
                isSame: false
            })
        }
    }, [formData.confirmPassword, formData.password])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })


        if (formErrors[name]) {
            setFormErrors({
                ...formErrors,
                [name]: ''
            })
        }
    }

    const validateForm = () => {
        const errors = {}

        if (!formData.first_name.trim()) errors.first_name = 'First name is required'
        if (!formData.last_name.trim()) errors.last_name = 'Last name is required'
        if (!formData.email.trim()) errors.email = 'Email is required'
        if (!formData.phone_number.trim()) errors.phone_number = 'Phone number is required'
        if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Email is invalid'
        }
        if (formData.phone_number && !/^\d{10}$/.test(formData.phone_number)) {
            errors.phone_number = 'Phone number must be 10 digits'
        }


        if (!formData.password) {
            errors.password = 'Password is required'
        } else if (!isPasswordValid()) {
            errors.password = 'Password does not meet all requirements'
        }

        if (!isConfirmPasswordValid()) {
            errors.confirmPassword = 'Passwords do not match'
        }

        setFormErrors(errors)
        return Object.keys(errors).length === 0
    }


    const isPasswordValid = () => {
        return (
            passwordValidation.hasUpperCase &&
            passwordValidation.hasLowerCase &&
            passwordValidation.hasNumber &&
            passwordValidation.hasSpecialChar &&
            passwordValidation.hasMinLength
        )
    }

    const isConfirmPasswordValid = () => {
        return confirmPasswordValidation.isSame
    }

    const getClassName = (fieldName) => {
        return `w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${formErrors[fieldName] ? 'border-red-500' : 'border-gray-300'
            }`
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!validateForm()) {
            return
        }
        const fullName = formData.middle_name
            ? `${formData.first_name} ${formData.middle_name} ${formData.last_name}`
            : `${formData.first_name} ${formData.last_name}`;

        const payload = {
            name: fullName,
            email: formData.email,
            phone: formData.phone_number,
            password: formData.password,
        };

        toast.promise(
            axiosInstance({
                method: 'POST',
                url: '/user/signup',
                data: payload
            })
                .then((res) => {
                    dispatch(saveUserData(res?.data?.data));
                    toast.success(res?.data?.message)
                    navigate('/')   
                })
        )
    }
    return (
        <div className="max-w-2xl mx-auto  mt-24 mb-8 bg-white rounded-xl shadow-2xl p-8">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Create Account</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">First Name <span className='text-red-500 text-md'>*</span></label>
                        <input
                            type="text"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleChange}
                            className={getClassName('first_name')}
                        />
                        {formErrors.first_name && (
                            <p className="text-sm text-red-600 mt-1">{formErrors.first_name}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Middle Name</label>
                        <input
                            type="text"
                            name="middle_name"
                            value={formData.middle_name}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Last Name <span className='text-red-500 text-md'>*</span></label>
                        <input
                            type="text"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleChange}
                            className={getClassName('last_name')}
                        />
                        {formErrors.last_name && (
                            <p className="text-sm text-red-600 mt-1">{formErrors.last_name}</p>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">


                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email <span className='text-red-500 text-md'>*</span></label>
                        <input
                            type="text"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={getClassName('email')}
                            placeholder="example@gmail.com"
                        />
                        {formErrors.email && (
                            <p className="text-sm text-red-600 mt-1">{formErrors.email}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number<span className='text-red-500 text-md'>*</span></label>
                        <input
                            type="number"
                            name="phone_number"
                            value={formData.phone_number}
                            onChange={handleChange}
                            className={getClassName('phone_number')}
                            placeholder="9865247088"
                        />
                        {formErrors.phone_number && (
                            <p className="text-sm text-red-600 mt-1">{formErrors.phone_number}</p>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Password <span className='text-red-500 text-md'>*</span></label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className={getClassName('password')}
                        />
                        {formErrors.password && (
                            <p className="text-sm text-red-600 mt-1">{formErrors.password}</p>
                        )}

                        {formData.password && (
                            <div className="mt-2 text-xs">
                                <p className="font-medium mb-1">Password must contain:</p>
                                <ul className="space-y-1">
                                    <li className={passwordValidation.hasUpperCase ? 'text-green-600' : 'text-red-600'}>
                                        {passwordValidation.hasUpperCase ? '✓' : '✗'} At least one uppercase letter
                                    </li>
                                    <li className={passwordValidation.hasLowerCase ? 'text-green-600' : 'text-red-600'}>
                                        {passwordValidation.hasLowerCase ? '✓' : '✗'} At least one lowercase letter
                                    </li>
                                    <li className={passwordValidation.hasNumber ? 'text-green-600' : 'text-red-600'}>
                                        {passwordValidation.hasNumber ? '✓' : '✗'} At least one number
                                    </li>
                                    <li className={passwordValidation.hasSpecialChar ? 'text-green-600' : 'text-red-600'}>
                                        {passwordValidation.hasSpecialChar ? '✓' : '✗'} At least one special character
                                    </li>
                                    <li className={passwordValidation.hasMinLength ? 'text-green-600' : 'text-red-600'}>
                                        {passwordValidation.hasMinLength ? '✓' : '✗'} At least 8 characters long
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password <span className='text-red-500 text-md'>*</span></label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className={getClassName('confirmPassword')}
                        />
                        {formErrors.confirmPassword && (
                            <p className="text-sm text-red-600 mt-1">{formErrors.confirmPassword}</p>
                        )}
                        {formData.confirmPassword && (
                            <div className="mt-2 text-xs">
                                <ul >
                                    <li className={confirmPasswordValidation.isSame ? 'text-green-600' : 'text-red-600'}>
                                        {confirmPasswordValidation.isSame ? '✓ Password Match' : '✗ Passwords Do not match'}
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 "
                >
                    {isSubmitting ? 'Submitting...' : 'Create Account'}
                </button>
            </form>

            <div className="mt-6 text-center">
                <p className="text-gray-600">Already have an account?</p>
                <button
                    onClick={() => navigate('/Login')}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                >
                    Login here
                </button>
            </div>
        </div>
    )
}

