import axios, { AxiosError } from "axios"
import { useQuery, UseQueryOptions } from "react-query";
import config from '../config/client.json'
import Script from "../types/script";
import auth from '../utils/auth';
import queryKeys from "./queryKeys";


const useUserScripts = (options?: UseQueryOptions<Script[], AxiosError>) => {

    const getUsersScripts = async (): Promise<Array<Script>> => {
        const token = auth.getToken();
        const axiosConfig = {
            headers: { Authorization: "Bearer " + token }
        }
        try {
            const { data } = await axios.get(`${config.API_URL}/user/scripts`, axiosConfig);
            return data.scripts;
        } catch (error) {
            throw error
        }
    }

    return useQuery<Script[], AxiosError>(queryKeys.user.SCRIPTS, getUsersScripts, options)
}


export {
    useUserScripts
}