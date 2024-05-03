import { createContext, useState, useContext, useEffect } from 'react';
import { registerRequest, loginRequest, verityTokenRequet } from "../api/auth";
import {registerEmpleadoRequest,getEmpleadosRequest, deleteEmpleadoRequest  } from "../api/authEmpleado";
import {registerAdminRequest,getAdminsRequest, deleteAdminRequest  } from "../api/authAdmin";
import Cookies from 'js-cookie';


export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider")

    }
    return context;
};


export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    const [isIngresar, setIsIngresar] = useState(false)

    const [errors, setErrors] = useState([]);

    // stado de carga

    const [loading, setLoading] = useState(true);

    const [empleados,setEmpleados] =  useState([]);

    // Admin

    const [admins,setAdmins] = useState([]);

    // para registar Usuario
    const signup = async (user) => {
        try {
            const res = await registerRequest(user);

            setUser(res.data);
            console.log(res.data)
            setIsIngresar(true)
            console.log("Entro a Registro>>" + isIngresar)
        } catch (error) {
            console.log(error.response.data)
            console.log("error al ingrear " + isIngresar)
            setErrors(error.response.data)
        }
    }

    // para el login acceso del usuario

    const signin = async (user) => {
        try {
            const res = await loginRequest(user);
            //console.log(res.data);
            setIsIngresar(true);
            
            setUser(res.data)
            
        } catch (error) {

            if (Array.isArray(error.response.data)) {
                return setErrors(error.response.data)
            }
            setErrors([error.response.data.message])
        }
    }

    // para que el error solo se muestre por 5 segundos
    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([])

            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [errors])

    //para leer la cookies del usuario y autenticar
    
    useEffect(() => {
        async function checkLogin() {
          const token = Cookies.get('token'); // Obtiene la cookie 'token'
          //console.log(token)
          
            try {
              const res = await verityTokenRequet();
              if (res.data) {
                
                localStorage.setItem("correo",res.data.email);
                localStorage.setItem("sede",res.data.sede);
                setUser(res.data);
                setIsIngresar(true);
              } else {
                console.error("Error no existe data");
                setIsIngresar(false);
                setLoading(false);
              }
            } catch (error) {
              console.error(">> Error en la función checkLogin: ", error);
              setIsIngresar(false);
              setUser(null);
              setLoading(false);
            }
          
        }
      
        checkLogin();
    }, [loading]);
    

    // para cerrar secion
    const cerrarSecion = () => {
        //console.log("Cerrar Secion")
        Cookies.remove("token");
        setIsIngresar(false);
        setUser(null);
    }


    //EMPLEADOS

    // para registar Empleado
    const signupEmpleado = async (user) => {
        try {
            //console.log(user)
            const res = await registerEmpleadoRequest(user);

            
        } catch (error) {
            console.log(error.response.data)
            
            setErrors(error.response.data)
        }
    }

    // para obtener los empleados

    

    const getEmpleados = async (id)=>{
        try {
            const res = await getEmpleadosRequest(id)
           
            setEmpleados(res.data)
        } catch (error) {
            setEmpleados([])
            console.error(error)
        }
    }
    

    // para eliminar empleado

    const deleteEmpleado = async (id)=>{
        try {
            const res = await deleteEmpleadoRequest(id);
            if(res.status == 200) setEmpleados(empleados.filter(empleado => empleado._id != id))
        } catch (error) {
            console.error(error)
        }
    }



    //Adminitradores

    // para registar Administrador
    const signupAdmin = async (user) => {
        try {
            //console.log(user)
            await registerAdminRequest(user);

            
        } catch (error) {
            console.log(error.response.data)
            
            setErrors(error.response.data)
        }
    }

    // para obtener los empleados

    

    const getAdmins = async ()=>{
        try {
            const res = await getAdminsRequest()
           
            setAdmins(res.data)
        } catch (error) {
            setAdmins([])
            console.error(error)
        }
    }
    

    // para eliminar empleado

    const deleteAdmin = async (id)=>{
        try {
            const res = await deleteAdminRequest(id);
            if(res.status == 200) setAdmins(admins.filter(admin => admin._id != id))
        } catch (error) {
            console.error(error)
        }
    }




    return (
        <AuthContext.Provider value={{
            signup,
            signin,
            loading,
            cerrarSecion,
            user,
            isIngresar,
            errors,
            signupEmpleado,
            empleados,
            getEmpleados,
            deleteEmpleado,
            signupAdmin,
            admins,
            deleteAdmin,getAdmins
            
        }}>
            {children}
        </AuthContext.Provider>
    )
}