import axios from './axios';




//Para registar usuario en db

export const registerEmpleadoRequest = (user) => axios.post(`/registerEmpleado`,user);

//Para obtener los empleados:

export const getEmpleadosRequest = (id) => axios.get(`/empleados/${id}`)
// Para Eliminar empleado

export const deleteEmpleadoRequest = (id) => axios.delete(`/empleados/${id}`)



