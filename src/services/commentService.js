import { requestFactory } from "./requester";

const baseUrl = 'http://localhost:3030/data/comments'; 

export const commentServiceFactory = (token) => {

    const request = requestFactory(token);
    
    const createComment = async (movieId,commentData) => {
        const result = await request.post(baseUrl, movieId, commentData);
        console.log(result)
        return result
    }
    
    const getAllComments = async (movieId) => {
        const query = encodeURIComponent(`movieId="${movieId}"`)
        const author = encodeURIComponent(`author=_ownerId:users`);
        const result = await request.get(`${baseUrl}/?where=${query}&load=${author}`);
        const comments = Object.values(result)
        return comments
    }

    return {
        createComment,
        getAllComments,
    }
}