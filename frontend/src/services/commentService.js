import { CUSTOM_BACKEND_API } from "../constants/common";
import { createPersonalPost } from "./postService"

export const createComment = async (newComment, post, personId) => {
    //[MISSING] a better way to check if post exists?
    //checks if given id is an integer (reddit stores post id`s as strings)
    if (/^\d+$/.test(post.id)) {
        return await createNewComment(newComment, personId, post.id)
    }
    else {
        post.id = ""
        post.personId = localStorage.getItem("uid")
        let newPost = await createPersonalPost(post, personId)
        return await createNewComment(newComment, personId, newPost.id)
    }
}

export const createNewComment = async (newComment, personId, postId) => {
    let authorization = localStorage.getItem('token') ? "Bearer " + localStorage.getItem('token') : ""
    const response = await fetch(CUSTOM_BACKEND_API + `/api/comment/person/${personId}/post/${postId}`, {
        method: 'POST',
        body: JSON.stringify(newComment),
        headers: {
            'content-type': 'application/json',
            'authorization': authorization
        }
    })

    return await response.json();
}

export const findCommentsByPersonId = async (personId) => {
    let authorization = localStorage.getItem('token') ? "Bearer " + localStorage.getItem('token') : ""
    const response = await fetch(CUSTOM_BACKEND_API + `/api/person/${personId}/comments`, {
        headers: {
            'content-type': 'application/json',
            'authorization': authorization
        }
    })

    return await response.json();
}

export const findCommentsByPostId = async (postId) => {
    let authorization = localStorage.getItem('token') ? "Bearer " + localStorage.getItem('token') : ""

    let URL_Extension = "";
    if(localStorage.getItem('token')) {
        URL_Extension = `/api/post/${postId}/comments`;
    } else {
        URL_Extension = `/api/nonAuth/post/${postId}/comments`;
    }

    const response = await fetch(CUSTOM_BACKEND_API + URL_Extension, {
        headers: {
            'content-type': 'application/json',
            'authorization': authorization
        }
    })

    return await response.json();

}

export const deleteCommentById = async (commentId) => {
    let authorization = localStorage.getItem('token') ? "Bearer " + localStorage.getItem('token') : ""
    const response = await fetch(CUSTOM_BACKEND_API + `/api/comment/${commentId}`, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json',
            'authorization': authorization
        }
    })

    return await response.json();
}


export const updateCommentService = async (comment, commentId) => {

    let authorization = localStorage.getItem('token') ? "Bearer " + localStorage.getItem('token') : ""
    const response = await fetch(CUSTOM_BACKEND_API + `/api/comment/${commentId}`, {
        method: 'PUT',
        body: JSON.stringify(comment),
        headers: {
            'content-type': 'application/json',
            'authorization': authorization
        }
    })

    return await response.json();
}


