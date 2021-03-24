import axios, { AxiosError } from "axios"
import { useQuery, UseQueryOptions } from "react-query";
import config from '../config/client.json'
import Bot from "../types/bot";
import auth from '../utils/auth';

const token = auth.getToken();

const axiosConfig = {
    headers: { Authorization: "Bearer " + token }
};

const useUserBots = (options?: UseQueryOptions<Bot[], AxiosError>) => {

    const getUsersBots = async (): Promise<Array<Bot>> => {
        try {
            const { data } = await axios.get(`${config.API_URL}/user/bots`, axiosConfig);
            return data.bots;
        } catch (error) {
            throw error
        }
    }

    return useQuery<Bot[], AxiosError>("bots", getUsersBots, options)
}


export {
    useUserBots
}