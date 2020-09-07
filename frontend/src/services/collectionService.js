import { CUSTOM_BACKEND_API } from "../constants/common";

export const addPostToCollection = async (pid, cid) => {
	let authorization = localStorage.getItem('token') ? "Bearer " + localStorage.getItem('token') : ""

	const response = await fetch(CUSTOM_BACKEND_API + `/api/connect/post/${pid}/collection/${cid}`, {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
			'authorization': authorization
		}
	})

	return await response.json();
}

export const addUserToCollection = async (pid, cid) => {
	let authorization = localStorage.getItem('token') ? "Bearer " + localStorage.getItem('token') : ""

	const response = await fetch(CUSTOM_BACKEND_API + `/api/collectionMembership/person/${pid}/collection/${cid}`, {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
			'authorization': authorization
		}
	})

	return await response.json();
}

export const removeUserFromCollection = async (pid, cid) => {
	let authorization = localStorage.getItem('token') ? "Bearer " + localStorage.getItem('token') : ""

	const response = await fetch(CUSTOM_BACKEND_API + `/api/remove/person/${pid}/collection/${cid}`, {
		method: 'DELETE',
		headers: {
			'content-type': 'application/json',
			'authorization': authorization
		}
	})

	return await response.json();
}

export const removePostFromCollection = async (pid, cid) => {
	let authorization = localStorage.getItem('token') ? "Bearer " + localStorage.getItem('token') : ""

	const response = await fetch(CUSTOM_BACKEND_API + `/api/remove/post/${pid}/collection/${cid}`, {
		method: 'DELETE',
		headers: {
			'content-type': 'application/json',
			'authorization': authorization
		}
	})

	return await response.json();
}


export const updateCollection = async (collection) => {
	let authorization = localStorage.getItem('token') ? "Bearer " + localStorage.getItem('token') : ""

	const response = await fetch(CUSTOM_BACKEND_API + `/api/collection/${collection.id}`, {
		method: 'PUT',
		body: JSON.stringify({
			collection_name: collection.collection_name,
			collection_description: collection.collection_description
		}),
		headers: {
			'content-type': 'application/json',
			'authorization': authorization
		}
	})

	return await response.json();
}


export const deleteCollection = async (cid) => {
	let authorization = localStorage.getItem('token') ? "Bearer " + localStorage.getItem('token') : ""

	const response = await fetch(CUSTOM_BACKEND_API + `/api/collection/${cid}`, {
		method: 'DELETE',
		headers: {
			'content-type': 'application/json',
			'authorization': authorization
		}
	})

	return await response.json();
}

export const getAllCollections = async () => {
	return localStorage.getItem('token') ?
		getAllCollectionsAuth() : getAllCollectionsNoAuth()
}

export const getAllCollectionsNoAuth = async () => {
	let authorization = localStorage.getItem('token') ? "Bearer " + localStorage.getItem('token') : ""

	const response = await fetch(CUSTOM_BACKEND_API + `/api/nonAuth/collection`, {
		method: 'GET',
		headers: {
			'content-type': 'application/json',
			'authorization': authorization
		}
	})

	return await response.json();
}

export const getAllCollectionsAuth = async () => {
	let authorization = localStorage.getItem('token') ? "Bearer " + localStorage.getItem('token') : ""

	const response = await fetch(CUSTOM_BACKEND_API + `/api/collection`, {
		method: 'GET',
		headers: {
			'content-type': 'application/json',
			'authorization': authorization
		}
	})

	return await response.json();
}

export const createCollection = (colData, userId) => {
	let authorization = localStorage.getItem('token') ? "Bearer " + localStorage.getItem('token') : ""

	return fetch(CUSTOM_BACKEND_API + `/api/person/${userId}/collection`, {
		method: 'POST',
		body: JSON.stringify(colData),
		headers: {
			'content-type': 'application/json',
			'authorization': authorization
		}
	}).then(r => r.json())
}

export const findCollectionById = (collectionId) => {
	return localStorage.getItem('token') ?
		findCollectionByIdAuth(collectionId) : findCollectionByIdNoAuth(collectionId)
}

export const findCollectionByIdNoAuth = (collectionId) => {
	let authorization = localStorage.getItem('token') ? "Bearer " + localStorage.getItem('token') : ""

	return fetch(CUSTOM_BACKEND_API + `/api/nonAuth/collection/${collectionId}`, {
		headers: {
			'content-type': 'application/json',
			'authorization': authorization
		}
	})
		.then(r => r.json())
}

export const findCollectionByIdAuth = (collectionId) => {
	let authorization = localStorage.getItem('token') ? "Bearer " + localStorage.getItem('token') : ""

	return fetch(CUSTOM_BACKEND_API + `/api/collection/${collectionId}`, {
		headers: {
			'content-type': 'application/json',
			'authorization': authorization
		}
	})
		.then(r => r.json())
}

export const findAllCollectionOfPerson = async (personId) => {
	let authorization = localStorage.getItem('token') ? "Bearer " + localStorage.getItem('token') : ""
	const response = await fetch(CUSTOM_BACKEND_API + `/api/person/${personId}/collections`, {
		headers: {
			'content-type': 'application/json',
			'authorization': authorization
		}
	})

	return await response.json();
}

