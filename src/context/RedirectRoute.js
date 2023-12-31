import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { UserAuth } from './AuthContext';

const RedirectRoute = () => {
    const { user } = UserAuth();
    return (
        !user ? <Outlet /> : <Navigate to='/home' />
    )
};

export default RedirectRoute;
