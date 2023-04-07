import { useAuthContext } from "../../contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export const RouteGuard = () => {
    const { isAuthenticated } = useAuthContext();

    if (isAuthenticated === false) {
        return <Navigate to ="/login" />
    }

    return <Outlet />
}