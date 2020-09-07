export const IsLoggedIn = () => { return localStorage.getItem("token") }
export const IsAuthorized = (id) => { return parseInt(localStorage.getItem("uid")) === id }
