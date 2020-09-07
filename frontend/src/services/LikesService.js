import {CUSTOM_BACKEND_API} from "../constants/common";

export const checkPostLiked = async (personId, postId) => {
    let authorization = localStorage.getItem('token') ? "Bearer " + localStorage.getItem('token') : ""
    const response = await fetch(CUSTOM_BACKEND_API + `/api/check/person/${personId}/post/${postId}/likes`, {
        headers: {
            'authorization': authorization
        }
    })

    return await response.json();
}



export const createLike = async (personId, postId) => {
    let authorization = localStorage.getItem('token') ? "Bearer " + localStorage.getItem('token') : ""
    const response = await fetch(CUSTOM_BACKEND_API + `/api/person/${personId}/post/${postId}/likes`, {
        method: 'POST',
        headers: {
            'authorization': authorization
        }
    })

    return await response.json();
}

export const deleteLike = async (personId, postId) => {
    let authorization = localStorage.getItem('token') ? "Bearer " + localStorage.getItem('token') : ""
    const response = await fetch(CUSTOM_BACKEND_API + `/api/person/${personId}/post/${postId}/likes`, {
        method: 'DELETE',
        headers: {
            'authorization': authorization
        }
    })

    return await response.json();
}



