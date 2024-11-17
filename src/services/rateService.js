import { requestFactory } from "./requester";

const baseUrl = "http://localhost:3030/data/rates";

export const rateServiceFactory = (token) => {
    const request = requestFactory(token);

    const rateMovie = async (rate, movieId) => {
        const res = await request.post(baseUrl, rate, movieId);
        return res
    }

    const getAllRates = async(movieId) => {
        const query = encodeURIComponent(`movieId="${movieId}"`)
        const author = encodeURIComponent(`author=_ownerId:users`);
        const result = await request.get(`${baseUrl}/?where=${query}&load=${author}`);
        // const rates = Object.values(result)
        return result;
    }

    return {
        rateMovie,
        getAllRates,
    }

}