import { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";
import {
    createViajeRequest,
    getViajesRequest,
    deleteViajeRequest,
    getViajeRequest,
    updateViajeRequest,

} from "../api/viajes";


import {
    
    registerSedeRequest,
    deleteSedeRequest,
    getSedesRequest,
    

} from "../api/sedes";

const ViajeContext = createContext()

export const useViajes = () => {
    const context = useContext(ViajeContext)

    if (!context) {
        throw new Error("useBIajes must be used a ViajeProviader")
    }

    return context
}

export function ViajeProvider({ children }) {

    const [viajes, setViajes] = useState([]);

    const [sedes, setSedes] = useState([]);

    
    // Para obtener los viajes

    const getViajes = async (id) => {
        
        try {
            const res = await getViajesRequest(id)
           
            setViajes(res.data);
        } catch (error) {
            console.error(error);
        }
    }

    // Para crear el viaje
    const createViaje = async (viaje) => {

        try {
            const res = await createViajeRequest(viaje);
            //console.log(">>Res backend")
            //console.log(res);
        } catch (error) {
            console.error(error)
        }
    }

    // para eliminar un viaje

    const deleteViaje = async (id) => {
        try {
            const res = await deleteViajeRequest(id)

            // verifificamos las respuesta del backend
            if (res.status === 204) setViajes(viajes.filter(viaje => viaje._id != id))
        } catch (error) {
            console.error(error)
        }

    };


    // editar y obtener un viaje

    const getViaje = async (id) => {
        try {
            const res = await getViajeRequest(id);
            return res.data
        } catch (error) {
            console.error(error)
        }
    }

    // Editar viaje
    const updateViaje = async (id, viaje) => {
        try {
            await updateViajeRequest(id, viaje)
        } catch (error) {
            console.error(error);
        }
    }


    //Sedes

    // para registar Sede
    const signupSede = async (sede) => {
        try {
            //console.log(user)
            await registerSedeRequest(sede);

            
        } catch (error) {
            console.log(error.response.data)
            
            setErrors(error.response.data)
        }
    }

    // para obtener las sedes

    

    const getSedes = async ()=>{
        try {
            const res = await getSedesRequest()
           
            setSedes(res.data)
        } catch (error) {
            setSedes([])
            console.error(error)
            console.log("ERROR>>")
        }
    }
    

    // para eliminar empleado

    const deleteSede = async (id)=>{
        try {
            const res = await deleteSedeRequest(id);
            if(res.status == 200) setSedes(sedes.filter(sede => sede._id != id))
        } catch (error) {
            console.error(error)
        }
    }


    return (
        <ViajeContext.Provider value={{
            viajes,
            createViaje,
            getViajes,
            deleteViaje,
            getViaje,
            updateViaje,
            
            signupSede,
            getSedes,
            deleteSede,
            sedes
        }}>
            {children}
        </ViajeContext.Provider>
    )
} 