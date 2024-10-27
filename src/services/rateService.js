import { requestFactory } from "./requester";

const baseUrl = "http://localhost:3030/data/rates";

export const rateServiceFactory = (token) => {
    const request = requestFactory(token);

    const rateMovie = async (rate) => {
        const res = await request.post(baseUrl, rate);
        return res
    }

    const getAllRates = async() => {
        const res = await request.get(baseUrl);
        return res
    }

    return {
        rateMovie,
        getAllRates
    }

}