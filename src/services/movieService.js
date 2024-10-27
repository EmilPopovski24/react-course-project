import { requestFactory } from "./requester";

const baseUrl = "http://localhost:3030/data/movies";

export const movieServiceFactory = (token) => {
    const request = requestFactory(token);

    const editMovie = (movieId, data) => {
        const result = request.put(`${baseUrl}/${movieId}`, data)
        return result;
    }

    const getAllMovies = async () => {
        const result = await request.get(baseUrl);
        const movies = Object.values(result);
        return movies
    }
    
    const getOneMovie = async (movieId) => {
        const result = await request.get(`${baseUrl}/${movieId}`);
        return result;
    }
    
    const createMovie = async (movieData) => {
        const res = await request.post(baseUrl, movieData);
        return res;
    }

    const rateMovie = async (rate, movieId) => {
        const res = await request.post(`${baseUrl}/${movieId}`, rate);
        console.log(res)
        return res
    }

    const getAllRates = async() => {
        const res = await request.get(baseUrl);
        return res
    }
   
    return {
        editMovie,
        getAllMovies,
        getOneMovie,
        createMovie, 
        rateMovie,
        getAllRates
    };
}


