

import { useAuth } from '../../context/AuthContext';
import logo from '../../assets/logo.png'
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
function LoginPage() {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const {signin , errors: signinErrors,isIngresar,signinEmpleado,user} = useAuth();

    const navigate = useNavigate();

    

    const onSubmit = handleSubmit(data => {
        
        signin(data);
        
    })
     

   

    useEffect(()=>{
        console.log(user)
        if(isIngresar && user.categoria != null) {
            localStorage.setItem("correo",user.email);
            navigate("/viajes/admin/Tarija")
        }
        else if (isIngresar && user.sede != null){
            localStorage.setItem("correo",user.email);
            localStorage.setItem("sede",user.sede);
            navigate(`/viajes/boleteros/${user.sede}`)
            
        }
        else if (isIngresar ) {
            localStorage.setItem("correo",user.email);
            navigate("/viajes/Tarija")
        }

        
    },[isIngresar])

    return ( 
        <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
            
            <div className='bg-zinc-800 max-w-md p-10 rounded-md'>
            {
                signinErrors.map((error,i)=>(
                    <div className="bg-red-500 p-2 text-white" key={i}>
                        {error}
                    </div>
                ))
            }
                
                <img src={logo} alt="Autobús" className="img-fluid mb-3" />
                <h1 className='text-2xl font-bold' style={{marginLeft:"30%"}}>MI VIAJE</h1>
                <h3 className='text-2xl '>Acceso</h3>
                <form onSubmit={onSubmit}>

                    <input type="email"
                        {...register("email", { required: true })}
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                        placeholder="Correo"
                    ></input>

                    {errors.email && (
                        <p className="text-red-500">El Correo es requerido</p>
                    )}
                    <input type="password"
                        {...register("password", { required: true })}
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2 "
                        placeholder="Contraseña"
                    ></input>
                    {errors.password && (
                        <p className="text-red-500">La contraseña  es requerido</p>
                    )}

                    <button type="submit" className='btn btn-primary' style={{width: "90%", margin:"5%"}}>Acceso</button>


                </form>

                <p className='flex gap-x-2 justify-between'>
                    ¿Aun no Tienes una Cuenta?<Link to="/register"
                    className='text-sky-500'>   Registrarse</Link>
                </p>
            </div>
        </div>
    )
}

export default LoginPage