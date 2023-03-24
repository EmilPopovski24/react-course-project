import * as request from "./requester";

const commentsUrl = "http://localhost:3030/jsonstore/comments";

export const create = async(data) => {
    const result = await request.post(commentsUrl, data);
    
    return result;
}

export const getAll = async(movieId) => {
    //to encode _id
    const query = encodeURIComponent(`movieId="${movieId}"`);
    const result = await request.get(`${commentsUrl}?where=${query}`);
    const comments = Object.values(result);
    return comments;
}

export const addComment = async(movieId, data) => {
    const result = await request.post(`${commentsUrl}/${movieId}/comments`, data);

    return result;
}