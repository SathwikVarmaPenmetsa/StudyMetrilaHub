import { Navigate } from 'react-router-dom'

import React from 'react'

const SignUpProtectedRouting = ({children, isLogin}) => {
  
    if(isLogin){
         return <Navigate to="/" replace />
    }
  
    return children
}

export default SignUpProtectedRouting;
