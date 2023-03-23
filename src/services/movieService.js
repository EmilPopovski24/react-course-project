import { request } from "./requester";

const baseUrl = "http://localhost:3030/jsonstore/movies"

export const getAllMovies = async () => {
    const result = await request("GET", baseUrl);
    
    const movies = Object.values(result);
    
    return movies
}