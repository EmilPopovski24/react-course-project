import { requestFactory } from "./requester";

const baseUrl = "http://localhost:3030/data/";

export const movieServiceFactory = (token) => {
    const request = requestFactory(token);

    const editMovie = (movieId, data) => {
        const result = request.put(`${baseUrl}/movies/${movieId}`, data)
        return result;
    }

    const getAllMovies = async () => {
        const result = await request.get(`${baseUrl}/movies`);
        const movies = Object.values(result);
        return movies
    }
    
    const getOneMovie = async (movieId) => {
        const result = await request.get(`${baseUrl}/movies/${movieId}`);

        return result;
    }
    
    const createMovie = async (movieData) => {
        const res = await request.post(`${baseUrl}/movies`, movieData);
        return res;
    }

    const createComment = async (movieId, commentData) => {
        const result = await request.post(`${baseUrl}/comments`,{movieId, commentData});
        return result
    }
    
    const getAllComments = async (movieId) => {
        const query = encodeURIComponent(`movieId="${movieId}"`)
        const author = encodeURIComponent(`author=_ownerId:users`);
        const result = await request.get(`${baseUrl}/comments/?where=${query}&load=${author}`);
        // const comments = Object.values(result)
        return  result
    }
    
    return {
        editMovie,
        getAllMovies,
        getOneMovie,
        createMovie,
        createComment,
        getAllComments
    };

}


