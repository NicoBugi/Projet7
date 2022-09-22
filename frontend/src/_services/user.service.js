/** Import des modules nécessaires */
import Axios from './caller.service'


let getAllUsers = () => {
    return Axios.get('/api/auth/')
}

let getUser = (uid) => {
    return Axios.get('/api/auth/' + uid)
}

let updateUser = (user) => {
    return Axios.patch('/api/auth/modify/' + user.id)
}

let signupUser = (data) => {
    return Axios.post('/api/auth/signup', data)
}

export const userService = {
    getAllUsers,
    getUser,
    updateUser,
    signupUser
}