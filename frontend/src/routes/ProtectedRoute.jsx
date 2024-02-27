import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = ({currentUser}) => {
    return currentUser ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;