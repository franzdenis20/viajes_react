import { useEffect, useState } from "react";

import { useViajes } from "../../context/ViajesContext";

import '../../Cards.css'
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
function ViajesPage() {
    const { getViajes, viajes, sedes, getSedes, deleteViaje } = useViajes();
    const { cerrarSecion } = useAuth()
    const [sede, setSede] = useState("Tarija")

    const navigate = useNavigate()





    useEffect(() => {
        getSedes()
        navigate(`/viajes/admin/${sede}`)

        getViajes(sede);
        //console.log(user)
        //<li style={{color:"skyblue"}}>{user.email} </li>
    }, [sede])
    //console.log(viajes)




    function handleSelect(event) {
        setSede(event.target.value)
    }

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
                <h1 style={{ color: "red", fontWeight: "bold" }}>Administardor  Viajes</h1>

                <ul style={{ flex: "row", flexWrap: "wrap" }} className="flex gap-x-2">
                    <li style={{ color: "skyblue" }}>{localStorage.getItem('correo')}</li>
                    <li>
                        <select className=" form-select form-select-lg mb-3" aria-label="Large select example" onChange={handleSelect}>
                            {
                                sedes.map(sede => (
                                    <option key={sede._id} value={sede.sede} >{sede.sede}</option>
                                ))
                            }
                        </select>
                    </li>

                    <li>

                        <Link type="button" className="btn btn-primary" to="/viajes/Sedes" >Sedes</Link>


                    </li>


                    <li>

                        <Link type="button" className="btn btn-primary" to="/viajes/administradores" >Administradores</Link>


                    </li>

                    <li>

                        <Link type="button" className="btn btn-primary" to="/viajes/empleados/Tarija" >Empleados</Link>


                    </li>

                    <li>

                        <Link type="button" className="btn btn-primary" to="/viajes/new/new" >Agregar Viaje</Link>


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
                                alt="Autobús" style={{ width: "280px", height: "220px", borderRadius: "5%" }} />
                            <p className="heading">
                                {viaje.destino}
                            </p>
                            <h2 style={{ color: "skyblue", fontWeight: "bold" }}>{compararFechas(viaje.fecha)}</h2>
                            <p> Hora:
                                {viaje.hora}
                            </p>
                            <p>Precio: {viaje.precio} BS</p>
                            <p>Asientos: {viaje.asientos}</p>
                            <p>Sede: {viaje.sede}</p>
                            <p>Columnas: {viaje.columnas}</p>
                            

                            <div>

                                <Link to={`/viajes/edit/${viaje._id}`} type="button" className="btn btn-warning" style={{ color: "yellow", margin: "3%", marginLeft: "15%" }}>Editar</Link>

                                <button type="button" onClick={() => deleteViaje(viaje._id)} className="btn btn-danger" style={{ color: "red", margin: "3%" }}>Eliminar</button>
                            </div>
                        </div>

                    ))
                }
            </div>
        </div>
    )
}


export default ViajesPage