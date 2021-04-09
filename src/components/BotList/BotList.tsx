import { message, Table } from 'antd';
import React, { useState } from 'react'
import { useQueryClient } from 'react-query';
import { useCreateBot, useDeleteBot } from '../../api/bot';
import queryKeys from '../../api/queryKeys';
import history from '../../history';
import Bot from '../../types/bot';

interface BotListProps {
    bots: Array<Bot>
}


export const BotList: React.FC<BotListProps> = ({ bots }) => {
    const queryClient = useQueryClient();
    const [botName, setBotName] = useState<string>("");
    const [script, setScript] = useState<string>("");

    const createBotMutation = useCreateBot({
        onSuccess: () => {
            queryClient.invalidateQueries(queryKeys.user.BOTS)
            message.success("新增成功！")
            setBotName("");
            setScript("");
        }
    })

    const deleteBotMutation = useDeleteBot({
        onSuccess: () => {
            queryClient.invalidateQueries(queryKeys.user.BOTS)
            message.success("刪除成功！")
        }
    })


    const columns = [
        {
            title: 'Id',
            dataIndex: '_id',
            key: '_id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '',
            dataIndex: '',
            key: 'x',
            render: (record) => {
                return <a onClick={() => deleteBotMutation({ botId: record._id })}>刪除</a>
            },
        },
        {
            title: '',
            dataIndex: '',
            key: 'edit',
            render: (record) => {
                return <a onClick={() => history.push(`/bot/update/${record._id}`)}>編輯</a>
            },
        },
    ];
    return (
        <div>
            <h1>機器人列表</h1>
            <Table dataSource={bots} columns={columns} rowKey="_id" />
        </div>
    );
}
