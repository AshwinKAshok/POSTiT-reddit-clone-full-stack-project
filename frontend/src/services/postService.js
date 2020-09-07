import { CUSTOM_BACKEND_API } from "../constants/common";
import redditService from "./redditService"

export const getPostFromRedditOrDatabse = async (postId) => {
    //[MISSING] a better way to check if post exists?
    //checks if given id is an integer (reddit stores post id`s as strings)
    if (/^\d+$/.test(postId)) {
        return await findPostById(postId)
    }
    else {
        let postFromReddit = await redditService.getPostById(postId)

        return {
            id: postFromReddit.id,
            title: postFromReddit.title,
            category: postFromReddit.subreddit,
            likes: 0,
            comments: [],
            collections: []
        }
    }
}

export const getPostsByCollectionId = async (cid) => {
    let authorization = localStorage.getItem('token') ? "Bearer " + localStorage.getItem('token') : ""

    const response = await fetch(CUSTOM_BACKEND_API + `/api/collection/${cid}/post`, {
        headers: {
            'content-type': 'application/json',
            'authorization': authorization
        }
    })

    return await response.json();
}

export const createPersonalPost = async (post, personId) => {
    let authorization = localStorage.getItem('token') ? "Bearer " + localStorage.getItem('token') : ""
    const response = await fetch(CUSTOM_BACKEND_API + `/api/person/${personId}/post`, {
        method: 'POST',
        body: JSON.stringify(post),
        headers: {
            'content-type': 'application/json',
            'authorization': authorization
        }
    })

    return await response.json();
}

export const updatePost = async (updatedPost, postId) => {
    let authorization = localStorage.getItem('token') ? "Bearer " + localStorage.getItem('token') : ""
    const response = await fetch(CUSTOM_BACKEND_API + `/api/post/${postId}`, {
        method: 'PUT',
        body: JSON.stringify(updatedPost),
        headers: {
            'content-type': 'application/json',
            'authorization': authorization
        }
    });

    return await response.json();
}

export const deletePostById = async (postId) => {
    let authorization = localStorage.getItem('token') ? "Bearer " + localStorage.getItem('token') : ""
    const response = await fetch(CUSTOM_BACKEND_API + `/api/post/${postId}`, {
        method: 'DELETE',
        headers: {
            'authorization': authorization
        }
    });

    return await response.json();
}

export const createCollectionPost = async (post, personId, collectionId) => {
    let authorization = localStorage.getItem('token') ? "Bearer " + localStorage.getItem('token') : ""
    const response = await fetch(CUSTOM_BACKEND_API + `/api/collectionId/${collectionId}/person/${personId}/post`, {
        method: 'POST',
        body: JSON.stringify(post),
        headers: {
            'content-type': 'application/json',
            'authorization': authorization
        }
    })

    return await response.json();
}

export const findPostById = async (postId) => {
    let authorization = localStorage.getItem('token') ? "Bearer " + localStorage.getItem('token') : ""
    const response = await fetch(CUSTOM_BACKEND_API + `/api/post/${postId}`, {
        headers: {
            'content-type': 'application/json',
            'authorization': authorization
        }
    })

    return await response.json();
}

export const findPostByIdNonAuth = async (postId) => {
    const response = await fetch(CUSTOM_BACKEND_API + `/api/nonAuth/post/${postId}`, {
        headers: {
            'content-type': 'application/json'
        }
    })

    return await response.json();
}

export const findAuthorIdByPostId = async (postId) => {
    let authorization = localStorage.getItem('token') ? "Bearer " + localStorage.getItem('token') : ""
    const response = await fetch(CUSTOM_BACKEND_API + `/api/post/${postId}/person`, {
        headers: {
            'content-type': 'application/json',
            'authorization': authorization
        }
    })



    return await response.json();
}

export const findAuthorIdByPostIdNonAuth = async (postId) => {
    const response = await fetch(CUSTOM_BACKEND_API + `/api/nonAuth/post/${postId}/person`, {
        headers: {
            'content-type': 'application/json'
            }
    })

    return await response.json();
}




export const findAllPostOfPerson = async (personId) => {
    let authorization = localStorage.getItem('token') ? "Bearer " + localStorage.getItem('token') : ""
    const response = await fetch(CUSTOM_BACKEND_API + `/api/person/${personId}/posts`, {
        headers: {
            'content-type': 'application/json',
            'authorization': authorization
        }
    })

    return await response.json();
}


export const findAllPosts = async () => {
    let authorization = localStorage.getItem('token') ? "Bearer " + localStorage.getItem('token') : ""
    const response = await fetch(CUSTOM_BACKEND_API + `/api/nonAuth/posts`, {
        headers: {
            'content-type': 'application/json',
            'authorization': authorization
        }
    })

    return await response.json();
}
