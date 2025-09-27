import React from 'react'
import classReducer, { saveClassDetails } from '../../redux/features/classSlice'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import axiosInstance from '../../Config/AxiosInstance'

export default function AdminHome() {
    const dispatch = useDispatch()

    useEffect(() => {
        fetchClasses()
    }, [])

    function fetchClasses() {
        axiosInstance({
            method: 'GET',
            url: '/class/get-all-classes/'
        })
            .then((res) => {
                console.log('res :>> ', res);
                dispatch(saveClassDetails(res?.data?.data))
            })
            .catch((err) => {
                console.log('err :>> ', err);
                toast.error(err?.response?.data?.message || 'Something went wrong')
            })
    }

    return (
        <div>AdminHome</div>
    )
}
