import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { UserAuth } from './AuthContext';

const ProtectedRoute = () => {
    const { user } = UserAuth();
    return (
        user ? <Outlet /> : <Navigate to='/' />
    )
};

export default ProtectedRoute;
