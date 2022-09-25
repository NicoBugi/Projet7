import Axios from './caller.service'

let getAllPosts = () => {
    return Axios.get('/api/posts/')
}

let getPost = (post) => {
    return Axios.get('/api/posts/' + post.id)
}

let createPost = (data) => {
    return Axios.post('/api/posts', data)
}
let deletePost = (data) => {
    return Axios.delete('/api/posts/' + data)
}
let likedPost = (post) => {
    return Axios.post('/api/posts/like', post)
}

let modifyPost = (formData) => {
    return Axios.put('/api/posts/', formData)
}

export const postService = {
    getAllPosts,
    getPost,
    createPost,
    likedPost,
    deletePost,
    modifyPost
}

