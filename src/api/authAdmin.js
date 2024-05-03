import axios from './axios';




//Para registar usuario en db

export const registerAdminRequest = (user) => axios.post(`/registerAdmin`,user);

//Para obtener los empleados:

export const getAdminsRequest = (id) => axios.get(`/admins/${id}`)
// Para Eliminar empleado

export const deleteAdminRequest = (id) => axios.delete(`/admin/${id}`)