import React, { useEffect, useState } from 'react'
import { useViajes } from '../../context/ViajesContext'

import RegisterEmpleado from './RegisterEmpleado'
import { useAuth } from '../../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'


function EmpleadosPage() {

  const [sede, setSede] = useState("Tarija")

  const { sedes, getSedes } = useViajes()
  const { empleados, getEmpleados, deleteEmpleado } = useAuth()
  const navigate = useNavigate()
  const handleSelect = (event) => {
    setSede(event.target.value)
  }

  useEffect(() => {
    getSedes();

    navigate(`/viajes/empleados/${sede}`)

    getEmpleados(sede);


  }, [sede])




  return (
    <div >
      <ul style={{ flex: "row", flexWrap: "wrap", marginLeft: "5%", marginTop: "5%" }} className="flex gap-x-2">

        <li>
          <select className=" form-select form-select-lg mb-3" aria-label="Large select example" onChange={handleSelect}>
            {
              sedes.map(sede => (
                <option key={sede._id} value={sede.sede}  >{sede.sede}</option>
              ))
            }
          </select>
        </li>

        <li>

          <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">Agregar Empleado</button>
        </li>

        <li>

          <Link type="button" className="btn btn-primary" to="/viajes/admin/Tarija" >volver</Link>


        </li>


      </ul>

      <h2 style={{ marginLeft: "5%" }}>Se debe eliminar al empleado en horas muertas  por ejemplo una vez se haya eliminado los viajes y se tenga que agregar nuevos viajes</h2>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">

            <RegisterEmpleado></RegisterEmpleado>
            <div className="modal-footer bg-zinc-700 ">
              <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>

            </div>
          </div>
        </div>
      </div>

      <div className="table-responsive ">
        <table className="table" style={{ width: "60%", margin: "5%" }}>
          <thead>
            <tr>
              <th >Nombre</th>
              <th >Correo</th>
              <th >Cotraseña</th>

              <th>Numero</th>
              <th>Sede</th>
              <th>Eliminar</th>


            </tr>
          </thead>
          <tbody>
            {empleados.map((empleado) => (
              <tr key={empleado._id}>
                <td>{empleado.username}</td>
                <td>{empleado.email}</td>
                <td>{empleado.password}</td>
                <td>{empleado.numero}</td>
                <td>{empleado.sede}</td>
                <td>
                  <button type="button" onClick={() => deleteEmpleado(empleado._id)} className="btn btn-danger" style={{ color: "red", margin: "3%" }}>Eliminar</button>
                </td>

              </tr>
            ))}


          </tbody>
        </table>
      </div>


    </div>
  )
}

export default EmpleadosPage
