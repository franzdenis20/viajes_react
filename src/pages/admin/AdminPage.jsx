import React, { useEffect, useState } from 'react'

import { useAuth } from '../../context/AuthContext'
import { Link, useNavigate} from 'react-router-dom'


function AdminPage() {

  const navigate =  useNavigate();

  
  const { admins, deleteAdmin ,getAdmins} = useAuth()



  useEffect(() => {

      getAdmins()
   
  }, [])


  

  return (
    <div>

      
      <ul style={{ flex: "row", flexWrap: "wrap", marginLeft: "5%", marginTop: "5%" }} className="flex gap-x-2">

        

        <li>

          <button type="button" className="btn btn-primary" onClick={()=> navigate('/viajes/admin/add')} >Agregar Administrador</button>
        </li>

        <li>

          <Link type="button" className="btn btn-primary" to="/viajes/admin/Tarija" >volver</Link>


        </li>



      </ul>

      

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
