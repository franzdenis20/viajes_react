import { useAuth } from "../../context/AuthContext";


import { useForm } from 'react-hook-form';
import { useViajes } from "../../context/ViajesContext";
import { useNavigate } from 'react-router-dom'

function RegisterSede() {

    const { register, handleSubmit, formState: { errors } } = useForm();


    const { errors: RegisterErrors } = useAuth();

    const { signupSede } = useViajes()

    const navigate = useNavigate();


    const onSubmit = handleSubmit(async (values) => {
        signupSede(values)
        navigate('/viajes/Sedes')
    })



    return (


        <div className='flex h-[calc(100vh-100px)] items-center justify-center'>



            <div className='bg-zinc-800  p-10 rounded-md'>
                {
                    RegisterErrors.map((error, i) => (
                        <div className="bg-red-500 p-2 text-white text-center" key={i}>
                            {error}
                        </div>
                    ))
                }

                <h1 className='text-2xl font-bold' style={{ marginLeft: "30%" }}>MI VIAJE</h1>
                <h3 className='text-2xl '>Registrar Sede</h3>
                <form onSubmit={onSubmit}>
                    <label>Sede</label>
                    <input type="text"
                        {...register("sede", { required: true })}
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                        placeholder="Sede"
                    ></input>
                    {errors.sede && (
                        <p className="text-red-500">La Sede es necesario</p>
                    )}





                    <button type="submit" className='btn btn-primary' style={{ width: "90%", margin: "5%" }}>Registrar</button>


                </form>

            </div>

        </div>

    )
}

export default RegisterSede