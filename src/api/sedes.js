import axios from './axios';




//Para registar usuario en db

export const registerSedeRequest = (sede) => axios.post(`/registerSede`,sede);

//Para obtener los empleados:

export const getSedesRequest = () => axios.get(`/sedes`)
// Para Eliminar empleado

export const deleteSedeRequest = (id) => axios.delete(`/sede/${id}`)