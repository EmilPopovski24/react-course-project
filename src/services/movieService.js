import { requestFactory } from "./requester";

const baseUrl = "http://localhost:3030/data/movies";

export const movieServiceFactory = (token) => {
    const request = requestFactory(token);

    const editMovie = (movieId, data) => {
        const result = request.put(`${baseUrl}/${movieId}`, data)
        return result;
    }

    const deleteMovie = (movieId)  => {
        const result =  request.del(`${baseUrl}/${movieId}`)
        return result;
    };

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
        // console.log(res);
        return res;
    }
    
    // const addComment = async(movieId, data) => {
    //     // console.log(movieId)
    //     // console.log(data)
    //     const newUrl = `${baseUrl}/${movieId}/comments`
    //     // console.log(newUrl)
    //     const result = await request.post(newUrl, data);
    //     // console.log(result);
    //     return result
    // }

    return {
        deleteMovie,
        editMovie,
        getAllMovies,
        getOneMovie,
        createMovie,
    };

}


