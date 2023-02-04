import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContextProvider } from "../Context/AuthContext";

function PrivateRoute({ children }) {
    const { state } = useContext(AuthContextProvider);
    if (!state.isAuth) {
        return <Navigate to="/login" />
    }
    return children;
}

export default PrivateRoute;