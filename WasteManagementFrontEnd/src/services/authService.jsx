import { toast } from "react-toastify";
import axios from "../api/axios"
import { isAxiosError } from "axios";

export const RegisterAPI = async (userName,email,password) => {

    try{
            const data = await axios.post('account/register',{
                Username:userName,
                Email:email,
                Password:password
            });
            return data;
    }
    catch(error){
        if(isAxiosError(error)){
            console.log(error)
            toast.warning(error?.response?.data)  
        }
    }
};

export const loginAPI = async (email,password) => {

    try{
            const data = await axios.post('account/login',{
                email,
                password
            });
            return data;
    }
    catch(error){
        if(isAxiosError(error)){
            console.log(error)
            toast.warning(error?.response?.data)  
        }
    }
};