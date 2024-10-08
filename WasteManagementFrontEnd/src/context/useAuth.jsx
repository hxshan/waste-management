import { createContext, useEffect, useState } from "react";
import { RegisterAPI,loginAPI} from "../services/authService";
import React from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify";

const UserContext = createContext();

export const UserProvider = ({ children }) =>{

    const [user,SetUser] = useState(null);
    const [token,SetToken] = useState(null);
    const [isReady,SetIsReady] = useState(false);
    const navigate = useNavigate();

    useEffect(()=>{
        const user = localStorage.getItem("user");
        const token = localStorage.getItem("token");

        if(user && token){
            SetUser(JSON.parse(user));
            SetToken(token);
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        }
        SetIsReady(true);
    },[]);

    const register = async (userName,email,password) => {

        await RegisterAPI(userName,email,password).then((res) =>{
            if(res){
                localStorage.setItem("token",res?.data.token);
                const userObj ={
                    userName: res?.data?.userName,
                    email: res?.data?.email
                };
                localStorage.setItem("user",JSON.stringify(userObj));
                SetToken(token)
                SetUser(userObj);
                navigate("/")
            }
        }).catch((e)=>{
            toast.warning("Error")
        })

    }
    
    const loginUser = async (email,password) => {

        await loginAPI(email,password).then((res) =>{
            if(res.status == 200){    
                localStorage.setItem("token",res.data.token);
                const userObj ={
                    userName: res?.data?.userName,
                    email: res?.data?.email,
                    role:res?.data?.role
                };  
                localStorage.setItem("user",JSON.stringify(userObj));
                SetToken(token)
                SetUser(userObj);
                switch(res?.data.role){
                    case 'Driver':
                        navigate("/client");
                        break;
                    default : 
                        navigate("/client")
                }
               
            }else{
                throw Error("Invalid Login")
            }
        }).catch((e)=>{
            toast.warning(e)
        })

    }

    const logout =() =>{
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        SetUser(null);
        SetToken(null);
        navigate('/login')
    }

    return(
        <UserContext.Provider value={{loginUser,register,logout,user,token}}>
            {isReady ? children : null}
        </UserContext.Provider>
    );
};

export const useAuth = () => React.useContext(UserContext);