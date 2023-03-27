import { requestFactory } from "./requester";

const baseUrl = 'http://localhost:3030/jsonstore/comments';

export const commentServiceFactory = (token) => {
    const request = requestFactory(token);
    
    const createComment = async (commentData) => {
        const result = await request.post(baseUrl, commentData);
    
        // console.log(data)
        // console.log("-------")
        // console.log(result)
        return result
    }
    
    const getAllComments = async(movieId) => {
        const query = encodeURIComponent(`movieId="${movieId}"`)
        // console.log(query)
        const result = await request.get(`${baseUrl}?where=${query}`)
        // console.log(result)
        const comments = Object.values(result);
        // console.log(comments)
        return comments;
        
        //  data OK
    }

    return {
        createComment,
        getAllComments,
    }
}