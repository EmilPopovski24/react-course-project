import { requestFactory } from "./requester";

const baseUrl = "http://localhost:3030/data/rates";

export const rateServiceFactory = (token) => {
    const request = requestFactory(token);

    const rateMovie = async (rate) => {
        const res = await request.post(baseUrl, rate);
        return res
    }

    const getAllRates = async() => {
        const result = await request.get(baseUrl);
        const rates = Object.values(result);
        return rates
    }

    return {
        rateMovie,
        getAllRates
    }

}