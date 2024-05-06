import React, { useEffect } from 'react'
import { useViajes } from '../../context/ViajesContext'
import { Link , useNavigate} from 'react-router-dom'
import RegisterSede from './RegisterSede'


function SedesPage() {

 
  const navigate = useNavigate()
  


  const {getSedes, sedes, deleteSede} = useViajes()

  useEffect(() => {

      getSedes()
   
  }, [])


  

  return (
    <div>

      
      <ul style={{ flex: "row", flexWrap: "wrap", marginLeft: "5%", marginTop: "5%" }} className="flex gap-x-2">

        

        <li>

          <button type="button" className="btn btn-primary" onClick={()=> navigate('/viajes/sedes/add')}>Agregar Sede</button>
        </li>

        <li>

          <Link type="button" className="btn btn-primary" to="/viajes/admin/Tarija" >volver</Link>


        </li>



      </ul>

      

      <div className="table-responsive ">
        <table className="table" style={{ width: "40%", margin: "5%" }}>
          <thead>
            <tr>
              <th >Nombre Sede</th>
              
              <th>Eliminar</th>


            </tr>
          </thead>
          <tbody>
            {sedes.map((sede) => (
              <tr key={sede._id}>
                <td>{sede.sede}</td>
                
                <td>
                <button type="button" onClick={()=> deleteSede(sede._id)} className="btn btn-danger" style={{ color: "red", margin: "3%" }}>Eliminar</button>
                </td>

              </tr>
            ))}


          </tbody>
        </table>
      </div>


    </div>
  )
}

export default SedesPage
