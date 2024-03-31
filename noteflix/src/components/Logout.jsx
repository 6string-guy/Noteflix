import React from "react";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { logout } from "../store/authSlice";
function LogoutBtn(){
    const dispatch =useDispatch()
    const logoutHandler=()=>{
        authService.logout().then(()=>{
            dispatch(logout())
        }).catch(error)
        {
            console.log( `ERROR :: ${error}`)
        }

    }
    return (
        <button className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`} {...props}>
            {children}
        </button>
    )
}
export default LogoutBtn;