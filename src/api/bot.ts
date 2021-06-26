import { message } from "antd";
import axios, { AxiosError } from "axios"
import { UseMutateFunction, useMutation, UseMutationOptions, useQuery, useQueryClient, UseQueryOptions } from "react-query";
import config from '../config/client.json'
import Bot from "../types/bot";
import auth from '../utils/auth';
import queryKeys from "./queryKeys";

const token = auth.getToken();

const axiosConfig = {
    headers: { Authorization: "Bearer " + token }
};

export interface CreateBotInput {
    name: string,
    nodes: string,
    isMoudle: boolean
}

const useCreateBot = (option: UseMutationOptions<any, AxiosError, CreateBotInput, unknown>): UseMutateFunction<any, AxiosError, CreateBotInput, unknown> => {
    const createBot = async (botData: CreateBotInput) => {
        if (!botData.name || !botData.nodes) return message.error("bot name or data cant not be empty")
        try {
            await axios.post(`${config.API_URL}/bot/create`, botData, axiosConfig)
        } catch (e) {
            throw e
        }
    }

    const { mutate } = useMutation(createBot, option);
    return mutate
}


export interface DeleteBotInput {
    botId: string
}

const useDeleteBot = (option: UseMutationOptions<any, AxiosError, DeleteBotInput, unknown>): UseMutateFunction<any, AxiosError, DeleteBotInput, unknown> => {
    const deleteBot = async (deleteBotInput: DeleteBotInput) => {
        if (!deleteBotInput.botId) return message.error("bot id must provide!")
        try {
            await axios.post(`${config.API_URL}/bot/delete/${deleteBotInput.botId}`, null, axiosConfig)
        } catch (e) {
            throw e
        }
    }

    const { mutate } = useMutation(deleteBot, option);
    return mutate
}


export interface UpdateBotInput {
    name: string,
    nodes: string,
    botId: string,
    isMoudle: boolean
}

const useUpdateBot = (option: UseMutationOptions<any, AxiosError, UpdateBotInput, unknown>): UseMutateFunction<any, AxiosError, UpdateBotInput, unknown> => {
    const updateBot = async (botData: UpdateBotInput) => {
        if (!botData.name || !botData.nodes) return message.error("bot name or data cant not be empty")
        try {
            await axios.post(`${config.API_URL}/bot/update/${botData.botId}`, botData, axiosConfig)
        } catch (e) {
            throw e
        }
    }

    const { mutate } = useMutation(updateBot, option);
    return mutate
}

const useBotData = (botId: string, options?: UseQueryOptions<Bot, AxiosError>) => {

    const getBot = async (): Promise<Bot> => {
        try {
            const { data } = await axios.get(`${config.API_URL}/bot/${botId}`, axiosConfig);
            return data
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    return useQuery<Bot, AxiosError>([queryKeys.bot.BOT, botId], getBot, options)
}

export {
    useCreateBot,
    useDeleteBot,
    useUpdateBot,
    useBotData
}
