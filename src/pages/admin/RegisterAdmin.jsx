import { useAuth } from "../../context/AuthContext";


import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'
function RegisterAdmin() {

    const { register, handleSubmit, formState: { errors }, setValue } = useForm();

    const { errors: RegisterErrors, signupAdmin } = useAuth();

    const navigate = useNavigate()

    setValue('categoria', "admin")


    const onSubmit = handleSubmit(async (values) => {
        signupAdmin(values);
        navigate('/viajes/administradores')
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

                <h1 className='text-2xl font-bold' style={{ marginLeft: "30%" }}>MI VIAJE</h1>
                <h3 className='text-2xl '>Registrar Administrador</h3>
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

                    <input type="number"
                        {...register("numero", { required: true })}
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2 "
                        placeholder="Numero Celular"
                    ></input>
                    {errors.password && (
                        <p className="text-red-500">El numero  es requerido</p>
                    )}

                    <input type="text"
                        readOnly
                        {...register("categoria", { required: true })}
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2 "

                    ></input>




                    <button type="submit" className='btn btn-primary' style={{ width: "90%", margin: "5%" }}>Registrar</button>


                </form>

            </div>
        </div>

    )
}

export default RegisterAdmin