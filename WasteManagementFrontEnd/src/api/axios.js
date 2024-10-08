import axios from "axios";
/**
 * TO WHO EVER IS USING THIS!
 * 
 * Port Number Differs from machine to maching
 * Change according to your port
 * 
 * To find port run the api and it shall be shown in the terminal 
 */
const BASE_URL = "http://localhost:5290/api/";


export default axios.create({
    baseURL:BASE_URL,
    withCredentials:true
})

//http://localhost:5224 