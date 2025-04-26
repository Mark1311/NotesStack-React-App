import axios from "axios";
import {BASE_URL} from './constants'

const axisoInstance = axios.create({
    baseURL: BASE_URL,
    timeOut: 10000,
    headers:{
        "Content-Type": "application/json"
    },
});

axisoInstance.interceptors.request.use(
    (config) =>{
        const accessToken = localStorage.getItem("token");
        if(accessToken){
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promis.reject(error);
    }
);

export default axisoInstance;