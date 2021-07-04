import { message } from "antd";
import axios, { AxiosError } from "axios"
import { UseMutateFunction, useMutation, UseMutationOptions, useQuery, useQueryClient, UseQueryOptions } from "react-query";
import config from '../config/client.json'
import Script from "../types/script";
import auth from '../utils/auth';
import queryKeys from "./queryKeys";

const token = auth.getToken();

const axiosConfig = {
    headers: { Authorization: "Bearer " + token }
};

export interface CreateScriptInput {
    name: string,
    nodes: string,
    isMoudle: boolean
}

const useCreateScript = (option: UseMutationOptions<any, AxiosError, CreateScriptInput, unknown>): UseMutateFunction<any, AxiosError, CreateScriptInput, unknown> => {
    const createScript = async (scriptData: CreateScriptInput) => {
        if (!scriptData.name || !scriptData.nodes) return message.error("script name or data cant not be empty")
        try {
            await axios.post(`${config.API_URL}/script/create`, scriptData, axiosConfig)
        } catch (e) {
            throw e
        }
    }

    const { mutate } = useMutation(createScript, option);
    return mutate
}


export interface DeleteScriptInput {
    scriptId: string
}

const useDeleteScript = (option: UseMutationOptions<any, AxiosError, DeleteScriptInput, unknown>): UseMutateFunction<any, AxiosError, DeleteScriptInput, unknown> => {
    const deleteScript = async (deleteScriptInput: DeleteScriptInput) => {
        if (!deleteScriptInput.scriptId) return message.error("script id must provide!")
        try {
            await axios.post(`${config.API_URL}/script/delete/${deleteScriptInput.scriptId}`, null, axiosConfig)
        } catch (e) {
            throw e
        }
    }

    const { mutate } = useMutation(deleteScript, option);
    return mutate
}


export interface UpdateScriptInput {
    name: string,
    nodes: string,
    scriptId: string,
    isMoudle: boolean
}

const useUpdateScript = (option: UseMutationOptions<any, AxiosError, UpdateScriptInput, unknown>): UseMutateFunction<any, AxiosError, UpdateScriptInput, unknown> => {
    const updateScript = async (scriptData: UpdateScriptInput) => {
        if (!scriptData.name || !scriptData.nodes) return message.error("script name or data cant not be empty")
        try {
            await axios.post(`${config.API_URL}/script/update/${scriptData.scriptId}`, scriptData, axiosConfig)
        } catch (e) {
            throw e
        }
    }

    const { mutate } = useMutation(updateScript, option);
    return mutate
}

const useScriptData = (scriptId: string, options?: UseQueryOptions<Script, AxiosError>) => {

    const getScript = async (): Promise<Script> => {
        try {
            const { data } = await axios.get(`${config.API_URL}/script/${scriptId}`, axiosConfig);
            return data
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    return useQuery<Script, AxiosError>([queryKeys.script.SCRIPT, scriptId], getScript, options)
}

export {
    useCreateScript,
    useDeleteScript,
    useUpdateScript,
    useScriptData
}
