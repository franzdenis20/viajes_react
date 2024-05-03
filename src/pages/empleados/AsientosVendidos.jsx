import { useEffect,useState } from 'react'
import '../../BoletosComprados.css'

import { useBoleto } from '../../context/BoletosContext'

import {  useNavigate, useParams } from "react-router-dom";

function AsientosVendidos() {
  

    
    const { asientosOcupados, getBoletosViaje } = useBoleto()
    
    
    const params = useParams()
    const navigate =  useNavigate()
    
    useEffect(() => {
        
        getBoletosViaje(params.id)
        
    }, [])
    
    return (
        <div>
            <h1 style={{ color: "skyblue", fontSize: "40px", fontWeight: "bold", margin: "5%" }}>Asientos Vendidos</h1>
            <div className="table-responsive">
                <table className="table" style={{width:"80%", margin: "5%",backgroundColor: "black", color: "white" }}>
                    <thead>
                        <tr>
                            <th scope="col">Destino</th>
                            <th scope="col">Asiento</th>
                            <th scope="col">Precio</th>
                            
                            <th>Hora</th>
                            <th>Nombre</th>
                            <th>CI</th>
                            <th>Correo</th>
                           
                            
                        </tr>
                    </thead>
                    <tbody>
                        {asientosOcupados.sort((a,b) => a.asiento - b.asiento).map((boleto) => (
                            <tr key={boleto._id}>
                                <td>{boleto.destino}</td>
                                <td>{boleto.asiento}</td>
                                <td>{boleto.precio}</td>
                                <td>{boleto.hora}</td>
                                <td>{boleto.nombre}</td>
                                <td>{boleto.ci}</td>
                                <td>{boleto.empleado.email}</td>
                               
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AsientosVendidos