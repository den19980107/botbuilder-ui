import axios, { AxiosError } from "axios"
import { useQuery, UseQueryOptions } from "react-query";
import config from '../config/client.json'
import Script from "../types/script";
import auth from '../utils/auth';
import queryKeys from "./queryKeys";


const useUserScripts = (onlyScriptMoudle: boolean = false, options?: UseQueryOptions<Script[], AxiosError>) => {

    const getUsersScripts = async (): Promise<Array<Script>> => {
        const token = auth.getToken();
        const axiosConfig = {
            headers: { Authorization: "Bearer " + token }
        }
        try {
            let url = `${config.API_URL}/user/scripts`;
            if (onlyScriptMoudle) url += `?onlyScriptMoudle=${onlyScriptMoudle}`
            const { data } = await axios.get(url, axiosConfig);
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