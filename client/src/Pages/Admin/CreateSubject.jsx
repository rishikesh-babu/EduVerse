import React from 'react'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import axiosInstance from '../../Config/AxiosInstance'
import { toast } from 'react-toastify'

export default function CreateSubject() {
    const { classDetails } = useSelector((state) => state.class)
    const [formData, setFormData] = useState({
        classId: '',
        subjectName: '',
        textbookFile: null
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleFileChange = (e) => {
        setFormData(prev => ({
            ...prev,
            textbookFile: e.target.files[0]
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!formData.classId || !formData.subjectName.trim()) {
            toast.error('Please select a class and enter subject name')
            return
        }


        // Create FormData for file upload
        const submitData = new FormData()
        submitData.append('classId', formData.classId)
        submitData.append('name', formData.subjectName.trim())

        if (formData.textbookFile) {
            submitData.append('file', formData.textbookFile)
        }
        toast.promise(
            axiosInstance({
                method: 'POST',
                url: '/subject/create',
                data: submitData
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

        // Reset form after successful submission
        setFormData({
            classId: '',
            subjectName: '',
            textbookFile: null
        })

        // Reset file input
        const fileInput = document.querySelector('input[type="file"]')
        if (fileInput) fileInput.value = ''
    }

    return (
        <div className="min-h-screen bg-blue-50 py-8">
            <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
                {/* Header with light blue background */}
                <div className="bg-white px-8 py-6">
                    <h1 className="text-3xl font-bold text-blue-800 text-center">Create New Subject</h1>
                    <p className="text-blue-600 text-center mt-2">Add subject details and textbook</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="px-8 py-6 space-y-6">
                    {/* Class Selection */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-blue-700">
                            Select Class <span className="text-red-500">*</span>
                        </label>
                        <select
                            name="classId"
                            value={formData.classId}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-400 outline-none transition-all bg-blue-50"
                            required
                        >
                            <option value="">Choose a class</option>
                            {classDetails?.map((classItem) => (
                                <option key={classItem._id} value={classItem._id}>
                                    Class {classItem.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Subject Name */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-blue-700">
                            Subject Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="subjectName"
                            value={formData.subjectName}
                            onChange={handleInputChange}
                            placeholder="Enter subject name (e.g., Mathematics, Science)"
                            className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-400 outline-none transition-all bg-blue-50"
                            required
                        />
                    </div>

                    {/* Textbook File Upload */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-blue-700">
                            Textbook File
                        </label>
                        <div className="flex items-center justify-center w-full">
                            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-blue-300 border-dashed rounded-lg cursor-pointer bg-blue-50 hover:bg-blue-100 transition-colors">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg className="w-8 h-8 mb-4 text-blue-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                    </svg>
                                    <p className="mb-2 text-sm text-blue-500">
                                        <span className="font-semibold">Click to upload</span> or drag and drop
                                    </p>
                                    <p className="text-xs text-blue-400">
                                        PDF, DOC, DOCX (MAX. 10MB)
                                    </p>
                                </div>
                                <input
                                    type="file"
                                    className="hidden"
                                    onChange={handleFileChange}
                                    accept=".pdf,.doc,.docx"
                                />
                            </label>
                        </div>
                        {formData.textbookFile && (
                            <p className="text-sm text-blue-600 mt-2">
                                Selected file: <span className="font-medium">{formData.textbookFile.name}</span>
                            </p>
                        )}
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-4 pt-4">
                        <button
                            type="button"
                            onClick={() => window.history.back()}
                            className="flex-1 bg-red-100 text-red-700 py-3 rounded-lg font-semibold hover:bg-red-200 transition-colors border border-red-200"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={!formData.classId || !formData.subjectName.trim()}
                        >
                            Create Subject
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}