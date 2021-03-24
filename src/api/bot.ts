import { message } from "antd";
import axios, { AxiosError } from "axios"
import { UseMutateFunction, useMutation, UseMutationOptions, useQueryClient } from "react-query";
import config from '../config/client.json'
import auth from '../utils/auth';

const token = auth.getToken();

const axiosConfig = {
    headers: { Authorization: "Bearer " + token }
};

export interface CreateBotInput {
    name: string,
    script: string
}

const useCreateBot = (option: UseMutationOptions<any, AxiosError, CreateBotInput, unknown>): UseMutateFunction<any, AxiosError, CreateBotInput, unknown> => {
    const createBot = async (botData: CreateBotInput) => {
        if (!botData.name || !botData.script) return message.error("bot name or data cant not be empty")
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

export {
    useCreateBot,
    useDeleteBot
}