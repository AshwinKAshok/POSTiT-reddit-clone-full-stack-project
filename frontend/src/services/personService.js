import { CUSTOM_BACKEND_API } from "../constants/common";

export const findPersonById = async (personId) => {
	let authorization = localStorage.getItem('token') ? "Bearer " + localStorage.getItem('token') : ""
	let response = await fetch(CUSTOM_BACKEND_API + `/api/person/id/${personId}`, {
		headers: {
			'content-type': 'application/json',
			'authorization': authorization
		}
	});

	if (response.status === 403) {
		response = await fetch(CUSTOM_BACKEND_API + `/api/nonAuth/person/id/${personId}`, {
			headers: {
				'content-type': 'application/json',
				'authorization': authorization
			}
		})
	}

	return await response.json();
}

export const findPersonByUsername = async (username) => {
	let authorization = localStorage.getItem('token') ? "Bearer " + localStorage.getItem('token') : ""

	const res = await fetch(CUSTOM_BACKEND_API + `/api/person/name/${username}`, {
		headers: {
			'content-type': 'application/json',
			'authorization': authorization
		}
	})

	return await res.json()
}

export const findCollectionsOfPerson = async (personId) => {
	let authorization = localStorage.getItem('token') ? "Bearer " + localStorage.getItem('token') : ""
	const response = await fetch(CUSTOM_BACKEND_API + `/api/`)
}

export const createPerson = async (person) => {
	const response = await fetch(CUSTOM_BACKEND_API + `/register/person`, {
		method: 'POST',
		body: JSON.stringify(person),
		headers: {
			'content-type': 'application/json'
		}
	})

	return await response.json();
}

export const updatePerson = async (person) => {
	let authorization = localStorage.getItem('token') ? "Bearer " + localStorage.getItem('token') : ""

	const response = await fetch(CUSTOM_BACKEND_API + `/api/person/` + person.id, {
		method: 'PUT',
		body: JSON.stringify(person),
		headers: {
			'content-type': 'application/json',
			'authorization': authorization
		}
	})

	return await response.json();
}

//
// export const addAddressToPerson = async (personId, addressId) => {
//
//     const response = await fetch(CUSTOM_BACKEND_API + `/register/connectAddress/person/${personId}/address/${addressId}`,{
//         method: 'PUT'
//     })
//     return await response.json();
// }

export const loginPerson = async (credentials) => {
	const response = await fetch(CUSTOM_BACKEND_API + `/authenticate`, {
		method: 'POST',
		body: JSON.stringify(credentials),
		credentials: 'same-origin',
		headers: {
			'content-type': 'application/json'
		}
	})


	return await response.json();
}

// export const addPhoneToPerson = async (personId, phoneId) => {
//
//     const response = await fetch(CUSTOM_BACKEND_API + `/register/connectPhone/person/${personId}/phone/${phoneId}`,{
//         method:'PUT'
//     })
//     return await response.json();
// }
