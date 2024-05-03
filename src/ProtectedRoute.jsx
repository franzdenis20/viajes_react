import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";


function ProtectedRoute(){
    const {loading,isIngresar }= useAuth()

    //console.log(">>Protected JSX  >>"+loading,isIngresar)

    //if(loading) return <h1>Loading..</h1>

    if(!loading && !isIngresar) return <Navigate to = '/login' replace></Navigate>

    return <Outlet></Outlet>
}

export default ProtectedRoute;