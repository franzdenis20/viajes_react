

import { MdAirlineSeatReclineExtra } from "react-icons/md";
import { GiSteeringWheel } from "react-icons/gi";

import { TfiUser } from "react-icons/tfi";
import { FaWhatsapp } from "react-icons/fa6";

import '../../Boleto.css'

import '../../Boleto.css'
import { useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useBoleto } from "../../context/BoletosContext";
import { useViajes } from "../../context/ViajesContext";

import { useForm } from 'react-hook-form';

function BoletosEmpleados() {
    const { register, handleSubmit, setValue } = useForm();

    const { createBoleto } = useBoleto()

    const params = useParams();

    const navigate = useNavigate()

    const onSubmit = handleSubmit(async (values) => {
        createBoleto(values)
        navigate("/boletosComprados")


    })

    //Determinar la cantidad de asientos del bus




    // Cargar los datos del viaje
    const { getViaje } = useViajes()
    const { asientosOcupados, getBoletosViaje } = useBoleto()

    const [asientosBus, setAsientosBus] = useState(0);
    const [asientoOcupadoUser, setAsientoOcupadoUser] = useState([])
    const [columnas, setColumnas] = useState(4)
    useEffect(() => {
        async function CargarViaje() {
            if (params.id) {
                const viaje = await getViaje(params.id);
                await getBoletosViaje(params.id)
                //console.log(viaje)

                setValue('viaje', params.id)
                setValue('destino', viaje.destino);
                setValue('hora', viaje.hora)
                setValue('precio', viaje.precio);
                
                setValue('sede', viaje.sede)
                setValue('asiento', "")
                setAsientosBus(viaje.asientos)

                setColumnas(viaje.columnas)

            }
        }

        CargarViaje()

    }, [])
    // Agrego los asientos ocupados
    useEffect(() => {
        const x = asientosOcupados.map(viaje => viaje.asiento)
        //console.log(x)
        x.sort((a, b) => a - b)
        setAsientoOcupadoUser(x)

    }, [asientosOcupados])

    const asientos = []
    //console.log(asientosOcupados);
    //console.log(asientoOcupadoUser)
    for (let i = 1; i <= asientosBus; i++) {
        asientos.push(i)

    }

    var y = true;
    var asientoComprado = 0;
    var contador = 0;
    return (
        <div className="Contenedor-Padre">
            <h1 style={{ color: "white", fontSize: "40px", fontWeight: "bold", marginLeft: "10%", marginTop: "2%" }}>Bus</h1>
            <div className="ContenedorBus">
                <div className="Cover"><h1></h1></div>
                <div style={{display:"flex"}}>
                    <div style={{ margin: "12%", marginLeft: "8%" }}>
                        <GiSteeringWheel size="5rem" />
                        <TfiUser size="4rem" />

                    </div>
                    <div style={{ margin: "12%", marginLeft: "15%", marginTop:"37%" }}>
                        <TfiUser size="4rem"  />
                    </div>
                </div>

                <div className="ContenedorBoletos">


                {asientos.map((asiento) => {
                        // Convertir asientoOcupadoUser[asiento - 1] a un número si es necesario
                        if (y) {
                            let asientoVerificar = parseInt(asientoOcupadoUser[contador]);
                            asientoComprado = asientoVerificar;
                        }

                        if (asiento === asientoComprado) {
                            y = true;
                            contador++;
                            if(columnas == 3){
                                return (
                                    <div key={asiento} className="AsientoOcupado3">
                                        <h2>N: {asiento}</h2>
                                        <MdAirlineSeatReclineExtra size="3rem" />
                                    </div>
                                );
                            }
                            else{
                                return (
                                    <div key={asiento} className="AsientoOcupado">
                                        <h2>N: {asiento}</h2>
                                        <MdAirlineSeatReclineExtra size="3rem" />
                                    </div>
                                );
                            }
                        } else {
                            y = false;
                            if(columnas == 3){
                                return (
                                    <div key={asiento} className="Asiento3" onClick={() => setValue("asiento", asiento)}>
                                        <h2>N: {asiento}</h2>
                                        <MdAirlineSeatReclineExtra size="3rem" />
                                    </div>
                                );
                            }
                            else{
                                return (
                                    <div key={asiento} className="Asiento" onClick={() => setValue("asiento", asiento)}>
                                        <h2>N: {asiento}</h2>
                                        <MdAirlineSeatReclineExtra size="3rem" />
                                    </div>
                                );
                            }
                            
                        }
                    })}






                </div>
            </div>
            <div style={{ marginTop: "5%" }}>
                <div className='bg-zinc-800 max-w-md p-10 rounded-md'>
                    <h1 style={{ fontSize: "40px", fontWeight: "bold", marginTop: "3%" }}>Viaje a Comprar</h1>


                    <form onSubmit={onSubmit}>
                        <label>ID Viaje</label>
                        <input type="text"
                            readOnly
                            {...register("viaje", { required: true })}
                            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"

                        ></input>
                        <label>Destino</label>
                        <input type="text"
                            readOnly
                            {...register("destino", { required: true })}
                            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"

                        ></input>
                        <label >Nro Asiento</label>
                        <input type="text"
                            readOnly
                            required
                            {...register("asiento", { required: true })}
                            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"

                        ></input>
                        <label>Nombre</label>
                        <input type="text"
                            
                            {...register("nombre", { required: true })}
                            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"

                        ></input>

                        <label>CI</label>
                        <input type="text"
                            
                            {...register("ci", { required: true })}
                            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"

                        ></input>
                        <label>Hora</label>
                        <input type="text"
                            readOnly
                            {...register("hora", { required: true })}
                            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"

                        ></input>
                        <label >Precio:</label>
                        <input type="text"
                            readOnly
                            {...register("precio", { required: true })}
                            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"

                        ></input>
                        
                        <label>Sede:</label>
                        <input type="text"
                            readOnly
                            {...register("sede", { required: true })}
                            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"

                        ></input>




                        <button type="submit" className='btn btn-primary' style={{ width: "90%", margin: "5%" }}>
                            Completar
                        </button>


                    </form>
                </div>
            </div>



        </div>
    )
}

export default BoletosEmpleados