
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({children, isLogin , role,allowedRoles }) => {
    if(!isLogin){
        return <Navigate to="/" replace />
    }
    if (allowedRoles && !allowedRoles.includes(role)) {
        return  ;
    }
  return children;
}

export default ProtectedRoute
