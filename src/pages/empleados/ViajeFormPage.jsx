

import { useViajes } from "../../context/ViajesContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';

function ViajeFormPage() {
    const { register, handleSubmit, setValue } = useForm();

    const navigate = useNavigate()

    const params = useParams();

    const { sedes, getSedes } = useViajes()
    useEffect(() => {
        async function CargarViaje() {
            if (params.id) {
                const viaje = await getViaje(params.id);
                //console.log(viaje)
                setValue('destino', viaje.destino);
                setValue('imagen', viaje.imagen);
                setValue('hora', viaje.hora)
                setValue('precio', viaje.precio);
                setValue('asientos', viaje.asientos)
                setValue('sede', viaje.sede)
                setValue('fecha', viaje.fecha)
            }
        }
        getSedes()
        setValue('columnas', 4)
        CargarViaje()
    }, [])
    // hacemos uso del contexto de viajes

    const { createViaje, getViaje, updateViaje } = useViajes()
    const [idUrl, setIdUrl] = useState("Tarija")
    // Selecionar los departamentos


    // determinar url de vuelta
    function handleSelect(event) {
        setIdUrl(event.target.value)

    }

    const onSubmit = handleSubmit(async (data) => {


        if (params.id != "new") {
            //console.log(params)

            updateViaje(params.id, data)
        } else {
            //console.log(">>entro crear viaje")
            console.log(data)
            createViaje(data)

        }
        navigate(`/viajes/admin/${idUrl}`)
    })


    return (
        <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
            <div className='bg-zinc-800 max-w-md p-10 rounded-md'>
                <h1 className='text-2xl font-bold' style={{ marginLeft: "30%" }}>Agregar Viaje</h1>
                <form onSubmit={onSubmit}>
                    <input
                        required
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                        type="text"
                        placeholder="Destino"
                        {...register("destino")}
                        autoFocus
                    >
                    </input>

                    <input
                        required
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                        type="text"
                        placeholder="Imagen"
                        {...register("imagen")}

                    >
                    </input>

                    <input
                        required
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                        type="time"
                        placeholder="Hora"
                        {...register("hora")}
                    >
                    </input>

                    <input
                        required
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                        type="number"
                        placeholder="Precio"
                        {...register("precio")}
                    >
                    </input>

                    <input
                        required
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                        type="number"
                        placeholder="Asientos"
                        {...register("asientos")}
                    >
                    </input>
                    <label>Columnas Asientos:</label>
                    <input
                        required
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                        type="number"
                        placeholder="columnas"
                        {...register("columnas")}
                    />

                    <label>Fecha:</label>
                    <input
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                        type="date"
                        placeholder="Fecha"
                        {...register("fecha")}
                    />
                    
                    <label>Sede</label>
                    <select className=" w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" aria-label="Large select example" {...register("sede")} onChange={handleSelect} >
                        {
                            sedes.map(sede => (
                                <option key={sede._id} value={sede.sede} >{sede.sede}</option>
                            ))
                        }

                    </select>

                    <button type="submit" className='btn btn-primary' style={{ width: "90%", margin: "5%" }}>Guardar Viaje</button>
                </form>
            </div>

        </div>
    )
}

export default ViajeFormPage;