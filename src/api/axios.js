import axios from 'axios';

const instance =  axios.create({
    withCredentials: true,
    // baseURL: "http://localhost:4000/api"
    baseURL: 'https://viajes-node.onrender.com/api'
    
})
export default instance;