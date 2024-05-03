import axios from "./axios";

// Para Obtener Todos los boletos de un usuario 
export const getBoletosRequest = () => axios.get(`/boletos`)

// obtener los asinetos de un viaje que pertenese al usurio

export const getBoletosViajeRequeest = (id) => axios.get(`/boletos/${id}`)

/// Crear boleto
export const createBoletoRequest = (boleto) => {
    console.log(boleto)
    axios.post(`/boletos`,boleto)
}

