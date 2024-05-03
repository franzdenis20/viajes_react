import { useEffect, useState } from "react";

import { useViajes } from "../../context/ViajesContext";

import '../../Cards.css'
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { verityTokenRequet } from "../../api/auth";

import Cookies from 'js-cookie';
function ViajesEmpleados() {
    const { cerrarSecion } = useAuth();

    const { getViajes, viajes } = useViajes();




    const navigate = useNavigate()

    useEffect(() => {
        async function checkLogin() {

            try {
                const res = await verityTokenRequet();
                if (res.data) {
                    navigate(`/viajes/boleteros/${res.data.sede}`)

                    await getViajes(res.data.sede);

                } else {
                    console.error("Error no existe data");

                }
            } catch (error) {
                console.error(">> Error en la función checkLogin: ", error);

            }

        }

        checkLogin();
    }, []);







    const compararFechas = (fechaViaje) => {
        const fechaActual = new Date();
        const fechaViajeDate = new Date(fechaViaje);

        // Comparar si la fecha del viaje es igual a la fecha actual
        if (fechaViajeDate.toISOString().slice(0, 10) === fechaActual.toISOString().slice(0, 10)) {
            return "HOY";
        }

        // Copiar la fecha actual y sumar un día
        const fechaMañana = new Date(fechaActual);
        fechaMañana.setDate(fechaMañana.getDate() + 1);

        // Comparar si la fecha del viaje es igual a la fecha de mañana
        if (fechaViajeDate.toISOString().slice(0, 10) === fechaMañana.toISOString().slice(0, 10)) {
            return "MAÑANA";
        }

        // Si no, devolver la fecha del viaje
        return fechaViaje;
    };


    return (
        <div className="container mx-auto px10">
            <nav style={{ flex: "row", flexWrap: "wrap" }}
                className=" navar my-2 flex justify-between py-5 px-10 rounded-lg ">
                <h1 style={{ color: "red", fontWeight: "bold" }}>Viajes Disponibles</h1>

                <ul style={{ flex: "row", flexWrap: "wrap" }} className="flex gap-x-2">
                    <li style={{ color: "skyblue" }}>{localStorage.getItem('correo')}</li>
                    <li style={{ color: "white" }}>{localStorage.getItem('sede')}</li>


                    <li>

                        <Link to="/boletosComprados" type="button" className="btn btn-primary" >Mis Boletos</Link>


                    </li>

                    <li>

                        <Link type="button" className="btn btn-danger" style={{ color: "red" }} to="/login" onClick={() => cerrarSecion()}>Cerrar Secion</Link>

                    </li>
                </ul>
            </nav>
            <div className="Contenedor">

                {
                    viajes.map((viaje) => (

                        <div className="card" key={viaje._id}>
                            <img src={viaje.imagen}
                                alt="Autobús" style={{ width: "280px", height: "220px", borderRadius: "5%", marginTop: "0%" }} />
                            <p className="heading">
                                {viaje.destino}
                            </p>
                            <h2 style={{ color: "skyblue", fontWeight: "bold" }}>{compararFechas(viaje.fecha)}</h2>
                            <p> Hora:
                                {viaje.hora}
                            </p>
                            <p>Precio: {viaje.precio} BS</p>
                            <p>Sede: {viaje.sede}</p>
                            <p>Distribuidora</p>

                            <div>
                                <Link type="button" to={`/boletosEmpleados/${viaje._id}`} className='btn btn-success' style={{ width: "90%", margin: "2%", color: "skyblue" }}>Vender</Link>
                                <Link type="button" to={`/boleto/vendidos/${viaje._id}`} className='btn btn-warning' style={{ width: "90%", margin: "2%", color: "skyblue" }}> Asientos Vendidos</Link>

                            </div>
                        </div>

                    ))
                }
            </div>
        </div>
    )
}


export default ViajesEmpleados