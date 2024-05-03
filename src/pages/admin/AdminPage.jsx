import React, { useEffect, useState } from 'react'
import { useViajes } from '../../context/ViajesContext'

import RegisterAdmin from './RegisterAdmin'
import { useAuth } from '../../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'


function AdminPage() {

 

  
  const { admins, deleteAdmin ,getAdmins} = useAuth()



  useEffect(() => {

      getAdmins()
   
  }, [])


  

  return (
    <div>

      
      <ul style={{ flex: "row", flexWrap: "wrap", marginLeft: "5%", marginTop: "5%" }} className="flex gap-x-2">

        

        <li>

          <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">Agregar Empleado</button>
        </li>

        <li>

          <Link type="button" className="btn btn-primary" to="/viajes/admin/Tarija" >volver</Link>


        </li>



      </ul>

      <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">

            <RegisterAdmin></RegisterAdmin>
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
              <th>Categoria</th>
              <th>Eliminar</th>


            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr key={admin._id}>
                <td>{admin.username}</td>
                <td>{admin.email}</td>
                <td>{admin.password}</td>
                <td>{admin.numero}</td>
                <td>{admin.categoria}</td>
                <td>
                <button type="button" onClick={()=> deleteAdmin(admin._id)} className="btn btn-danger" style={{ color: "red", margin: "3%" }}>Eliminar</button>
                </td>

              </tr>
            ))}


          </tbody>
        </table>
      </div>


    </div>
  )
}

export default AdminPage
