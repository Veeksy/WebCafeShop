import { useState } from "react";

export default function useToken(){
    const getToken = () =>{
        const tokenString = sessionStorage.getItem('Token');
        const userToken = tokenString;
        return userToken
        };
    const [Token, setToken] = useState(getToken());

    const saveToken = userToken=>{
        sessionStorage.setItem('Token',userToken.Token);
        setToken(userToken.Token);
    };

    

    return{
        setToken:saveToken,
        Token
    }
}