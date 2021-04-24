import axios, { AxiosError } from "axios";
import { UseMutateFunction, useMutation, UseMutationOptions, useQuery, UseQueryOptions } from "react-query";
import Table from "../types/table";
import auth from "../utils/auth";
import config from '../config/client.json';
import queryKeys from "./queryKeys";
import { message } from "antd";
import Column from "../types/column";
import ColumnDataType from "../constant/columnDataType.constants";

const token = auth.getToken();

const axiosConfig = {
    headers: { Authorization: "Bearer " + token }
};


const useAllTableData = (options?: UseQueryOptions<Table[], AxiosError>) => {

    const getTables = async (): Promise<Table[]> => {
        try {
            const { data } = await axios.get(`${config.API_URL}/database/table`, axiosConfig);
            return data
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    return useQuery<Table[], AxiosError>(queryKeys.table.TABLE, getTables, options)
}


export interface CreateTableInput {
    name: string
}

const useCreateTable = (option: UseMutationOptions<any, AxiosError, CreateTableInput, unknown>): UseMutateFunction<any, AxiosError, CreateTableInput, unknown> => {
    const createBot = async (tableData: CreateTableInput) => {
        if (!tableData.name) return message.error("table name cant not be empty")
        try {
            await axios.post(`${config.API_URL}/database/table/create`, tableData, axiosConfig)
        } catch (e) {
            throw e
        }
    }

    const { mutate } = useMutation(createBot, option);
    return mutate
}

const useColsDataByTableId = (tableId: string, options?: UseQueryOptions<Column[], AxiosError>) => {

    const getCols = async (): Promise<Column[]> => {
        try {
            const { data } = await axios.get(`${config.API_URL}/database/table/${tableId}/column`, axiosConfig);
            return data
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    return useQuery<Column[], AxiosError>([queryKeys.table.COLUMNS, tableId], getCols, options)
}

export interface CreateColumnInput {
    tableId: string,
    name: string,
    displayName: string,
    require: boolean,
    dataType: ColumnDataType
}

const useCreateColumn = (option: UseMutationOptions<any, AxiosError, CreateColumnInput, unknown>): UseMutateFunction<any, AxiosError, CreateColumnInput, unknown> => {
    const createColumn = async (tableData: CreateColumnInput) => {
        if (!tableData.tableId || !tableData.name || !tableData.displayName || !tableData.dataType) return message.error("you are misssing some filed to create column")
        try {
            await axios.post(`${config.API_URL}/database/table/${tableData.tableId}/column/create`, tableData, axiosConfig)
        } catch (e) {
            throw e
        }
    }

    const { mutate } = useMutation(createColumn, option);
    return mutate
}

export interface DeleteColumnInput {
    tableId: string,
    columnId: string
}

const useDeleteColumn = (option: UseMutationOptions<any, AxiosError, DeleteColumnInput, unknown>): UseMutateFunction<any, AxiosError, DeleteColumnInput, unknown> => {
    const deleteColumn = async (tableData: DeleteColumnInput) => {
        if (!tableData.tableId || !tableData.columnId) return message.error("table id and column id cant not be empty")
        try {
            await axios.post(`${config.API_URL}/database/table/${tableData.tableId}/column/delete/${tableData.columnId}`, tableData, axiosConfig)
        } catch (e) {
            throw e
        }
    }

    const { mutate } = useMutation(deleteColumn, option);
    return mutate
}

const useTableDataByTableId = (tableId: string, options?: UseQueryOptions<Array<any>, AxiosError>) => {

    const getTableData = async (): Promise<Array<any>> => {
        try {
            const { data } = await axios.get(`${config.API_URL}/database/customTable/${tableId}/data`, axiosConfig);
            console.log("data = ", data)
            return data
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    return useQuery<Array<any>, AxiosError>([queryKeys.table.VALUE, tableId], getTableData, options)
}

export interface CreateTableDataInput {
    tableId: string,
    data: Array<any>
}

const useCreateTableData = (option: UseMutationOptions<any, AxiosError, CreateTableDataInput, unknown>): UseMutateFunction<any, AxiosError, CreateTableDataInput, unknown> => {
    const createTableData = async (tableData: CreateTableDataInput) => {
        if (!tableData.tableId || !tableData.data) return message.error("table id and column id cant not be empty")
        try {
            await axios.post(`${config.API_URL}/database/customTable/${tableData.tableId}/data/create`, tableData, axiosConfig)
        } catch (e) {
            throw e
        }
    }

    const { mutate } = useMutation(createTableData, option);
    return mutate
}


export interface DeleteTableDataInput {
    tableId: string,
    rowId: string
}

const useDeleteTableData = (option: UseMutationOptions<any, AxiosError, DeleteTableDataInput, unknown>): UseMutateFunction<any, AxiosError, DeleteTableDataInput, unknown> => {
    const deleteTableData = async (tableData: DeleteTableDataInput) => {
        if (!tableData.tableId || !tableData.rowId) return message.error("table id and row id cant not be empty")
        try {
            await axios.post(`${config.API_URL}/database/customTable/${tableData.tableId}/data/delete`, tableData, axiosConfig)
        } catch (e) {
            throw e
        }
    }

    const { mutate } = useMutation(deleteTableData, option);
    return mutate
}

export {
    useAllTableData,
    useCreateTable,
    useColsDataByTableId,
    useTableDataByTableId,
    useDeleteColumn,
    useCreateColumn,
    useCreateTableData,
    useDeleteTableData
}
