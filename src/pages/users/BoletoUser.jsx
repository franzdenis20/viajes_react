
import { MdAirlineSeatReclineExtra } from "react-icons/md";
import { GiSteeringWheel } from "react-icons/gi";

import { TfiUser } from "react-icons/tfi";
import { FaWhatsapp } from "react-icons/fa6";

import '../../Boleto.css'
import { useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useBoleto } from "../../context/BoletosContext";
import { useViajes } from "../../context/ViajesContext";

import { useForm } from 'react-hook-form';
import { useAuth } from "../../context/AuthContext";

function BoletoUser() {
    const { handleSubmit, setValue } = useForm();

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
    const { getEmpleados, empleados } = useAuth()
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

                setAsientosBus(viaje.asientos)
                setColumnas(viaje.columnas)
                await getEmpleados(viaje.sede)
            }
        }

        CargarViaje()

    }, [])
    // Agrego los asientos ocupados
    useEffect(() => {
        const x = asientosOcupados.map(viaje => viaje.asiento)
        
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
                <div style={{ display: "flex" }}>
                    <div style={{ margin: "12%", marginLeft: "8%" }}>
                        <GiSteeringWheel size="5rem" />
                        <TfiUser size="4rem" />

                    </div>
                    <div style={{ margin: "12%", marginLeft: "15%", marginTop: "37%" }}>
                        <TfiUser size="4rem" />
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

            <div style={{ marginTop: "15%", marginLeft: "20%" }}>
                {
                    empleados.map((empleado) => (
                        <div key={empleado._id} style={{ margin: "10%", }} >
                            <h2 style={{ fontSize: "15px", fontWeight: "bold", marginLeft: "10%", marginTop: "2%", marginRight: "4%", margin: "2%" }}> {empleado.username}</h2>
                            <hr />
                            <div className="btn btn-info" style={{ display: "flex" }} onClick={() => window.open(`https://wa.me/+591${empleado.numero}`, "_blank")}>
                                <FaWhatsapp size="4rem" style={{ margin: "2%" }} />
                                <h2 style={{ fontSize: "15px", fontWeight: "bold", }}>Contactar</h2>

                            </div>

                        </div>
                    ))
                }
            </div>





        </div>
    )
}

export default BoletoUser