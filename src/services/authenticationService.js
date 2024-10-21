import { requestFactory } from "./requester";

const usersUrl = "http://localhost:3030/users"

export const authServiceFactory = (token) => {
    const request = requestFactory(token);
    
    return {
        login:(loginData) => request.post(`${usersUrl}/login`, loginData),
        register: (registerData) =>  request.post(`${usersUrl}/register`, registerData),
        logout:() =>  request.get(`${usersUrl}/logout`),
    }
}