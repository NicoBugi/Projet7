/** Import des modules nécessaires */
import Axios from './caller.service'
import jwt_Decode from "jwt-decode";

let tokenDecode = (token) => {
    let decode = jwt_Decode(token);
    return decode
}


let loginUser = (credentials) => {
    return Axios.post('/api/auth/login', credentials)
}

let logout = () => {
    localStorage.removeItem('token')
}

let getToken = () => {
    return localStorage.getItem('token')
}

let saveToken = (token) => {
    localStorage.setItem('token', token)
}

let isLogged = () => {
    let token = localStorage.getItem('token')
    return !!token
}

export const accountService = {
    loginUser,
    logout,
    saveToken,
    getToken,
    isLogged,
    tokenDecode
}

