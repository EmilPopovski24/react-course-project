import { requestFactory } from "./requester";

const baseUrl = 'http://localhost:3030/data/comments'; 

// export const commentServiceFactory = (token) => {
const request = requestFactory();
    
export const createComment = async (movieId, comment) => {
        const result = await request.post(baseUrl,{movieId, comment});
        
        // console.log(data)
        // console.log("-------")
        // console.log(result)
        return result
    }
    
export const getAllComments = async (movieId) => {
        const query = encodeURIComponent(`movieId="${movieId}"`)
        // console.log(query)
        const result = await request.get(`${baseUrl}?where=${query}`)
        // console.log(result)
        const comments = Object.values(result);
        // console.log(comments)
        return result;
        
        //  data OK
    }

    // return {
    //     createComment,
    //     getAllComments,
    // }
// }