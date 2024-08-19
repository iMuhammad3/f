import { Navigate, Outlet } from "react-router-dom";
import useUser from "../hooks/useUser";

// eslint-disable-next-line react/prop-types
const ProtectedLayout = () => {
    const { data: user, isLoading, error } = useUser();

    if (isLoading) return <p>Loading...</p>;

    if (error || !user) {
        console.log("yh");
        
        return <Navigate to="/login" />;
    }

    return <Outlet />
};

export default ProtectedLayout;
