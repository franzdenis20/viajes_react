
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";
import { useNavigate ,Link} from 'react-router-dom';

import { useForm } from 'react-hook-form';
import logo from '../../assets/logo.png'

function RegisterPage() {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const { signup, isIngresar, errors: RegisterErrors } = useAuth();

    const navigate = useNavigate();

    useEffect(()=>{
        if (isIngresar) navigate("/")
    },[isIngresar])

    const onSubmit = handleSubmit(async (values) => {
        signup(values);

    })

    return (
        <div className='flex h-[calc(100vh-100px)] items-center justify-center'>

            <div className='bg-zinc-800 max-w-md p-10 rounded-md'>
                {
                    RegisterErrors.map((error, i) => (
                        <div className="bg-red-500 p-2 text-white text-center" key={i}>
                            {error}
                        </div>
                    ))
                }
                <img src={logo} alt="Autobús" className="img-fluid mb-3" />
                <h1 className='text-2xl font-bold' style={{marginLeft:"30%"}}>MI VIAJE</h1>
                <h3 className='text-2xl '>Registrar</h3>
                <form onSubmit={onSubmit}>
                    <input type="text"
                        {...register("username", { required: true })}
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                        placeholder="Nombre de usuario"
                    ></input>
                    {errors.username && (
                        <p className="text-red-500">El usuario es requerido</p>
                    )}
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

                    <button type="submit" className='btn btn-primary' style={{width: "90%", margin:"5%"}}>Registrarse</button>


                </form>
                <p className='flex gap-x-2 justify-between'>
                    ¿Ya Tienes una Cuenta?<Link to="/login"
                    className='text-sky-500'>   Acceso</Link>
                </p>
            </div>
        </div>
    )
}

export default RegisterPage;