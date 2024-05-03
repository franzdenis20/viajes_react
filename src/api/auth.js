
import axios from './axios';




//Para registar usuario en db

export const registerRequest = (user) => axios.post(`/register`,user);


// Para iniciar seccion login

export const loginRequest = user =>  axios.post(`/login`,user)

// paraverificar usuario


export const verityTokenRequet = ()=> axios.get(`/verify`);

