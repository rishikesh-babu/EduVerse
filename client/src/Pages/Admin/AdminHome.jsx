import React from 'react'
import classReducer from '../../redux/features/classSlice'
import { useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import axiosInstance from '../../Config/AxiosInstance'

export default function AdminHome() {
    const dispatch = useDispatch()
    const classes = useSelector((state) => state.class)

    useEffect(() => {
        toast.promise(
            axiosInstance({
                method: 'GET',
                url: '/class/get-all-classes/'
            })
                .then((res) => {
                    console.log('res :>> ', res);
                    console.log('res?.data?.message :>> ', res?.data?.message);
                    toast.success(res?.data?.message)
                    

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
    }, [])

    return (
        <div>AdminHome</div>
    )
}
