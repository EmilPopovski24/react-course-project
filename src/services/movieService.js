import * as request from "./requester";

const baseUrl = "http://localhost:3030/jsonstore/movies"

export const getAllMovies = async () => {
    const result = await request.get(baseUrl);
    
    const movies = Object.values(result);
    
    return movies
}

export const getOneMovie = async (movieId) => {
    const result = await request.get(`${baseUrl}/${movieId}`);
    console.log(result);
    return result;
}

export const create = async (movieData) => {
    const res = await request.post(baseUrl, movieData);
    console.log(res);
    return res;
}

