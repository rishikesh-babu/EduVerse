import React, { use, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'

export default function UserProtectedLayout() {
    const { isUserAuth } = useSelector(state => state.user)
    const navigate  = useNavigate();
  
    useEffect(() => {
        if (!isUserAuth) {
            navigate('/login')
        }
    }, [ isUserAuth])

    return (
        <div>
            <Outlet />
        </div>
    )
}
