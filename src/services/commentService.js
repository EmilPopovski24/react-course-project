import * as request from "./requester";

const baseUrl = 'http://localhost:3030/jsonstore/comments';

export const create = async (data) => {
    const result = await request.post(baseUrl, data);

    // console.log(data)
    // console.log("-------")
    console.log(result)
    return result
}

export const getAllComments = async(movieId) => {
    const query = encodeURIComponent(`movieId="${movieId}"`)
    const result = await request.get(`${baseUrl}?where=${query}`)
    // console.log(result)
    const comments = Object.values(result);
    // console.log(comments)
    return comments;
}