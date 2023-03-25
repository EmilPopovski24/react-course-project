import * as request from "./requester";

const usersUrl = "http://localhost:3030/users"

export const login = (loginData) => {
    return request.post(`${usersUrl}/login`, loginData);
}

export const register = (registerData) => {
    return request.post(`${usersUrl}/register`, registerData);
}

export const logout = () => {
    return request.get(`${usersUrl}/logout`);
}