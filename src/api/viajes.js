import axios from "./axios";
 
export const getViajesRequest = (id) => axios.get(`/tasks/${id}`)

export const getViajeRequest = (id) => axios.get(`/tasks/data/${id}`)

export const createViajeRequest = (viaje) => {
    console.log(viaje)
    axios.post(`/tasks`,viaje)
}

export const updateViajeRequest = (id, viaje) =>
 axios.put(`/tasks/${id}`,viaje)

export const deleteViajeRequest = (id) => axios.delete(`/tasks/${id}`);