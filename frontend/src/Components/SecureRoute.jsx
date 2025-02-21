import React from 'react'
import { Navigate } from 'react-router-dom'

const SecureRoute = ({ children }) => {
    const token = localStorage.getItem("token");

  return token ? children : <Navigate to="/login" />
}

export default SecureRoute
