import jwt_Decode from "jwt-decode";

let tokenDecode = (token) => {
    let decode = jwt_Decode(token);
    console.log(decode)
    return decode
}

export const tokenService = {
    tokenDecode
}