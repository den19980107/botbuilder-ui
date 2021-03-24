import { Button, message, Table } from 'antd';
import React, { useState } from 'react'
import { useQueryClient } from 'react-query';
import { useCreateBot, useDeleteBot } from '../../api/bot';
import Bot from '../../types/bot';

interface BotListProps {
    bots: Array<Bot>
}

const BotList: React.FC<BotListProps> = ({ bots }) => {
    const queryClient = useQueryClient();
    const [botName, setBotName] = useState<string>("");
    const [script, setScript] = useState<string>("");

    const createBotMutation = useCreateBot({
        onSuccess: () => {
            queryClient.invalidateQueries("bots")
            message.success("新增成功！")
            setBotName("");
            setScript("");
        }
    })

    const deleteBotMutation = useDeleteBot({
        onSuccess: () => {
            queryClient.invalidateQueries("bots")
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
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: (record) => {
                return <a onClick={() => deleteBotMutation({ botId: record._id })}>delete</a>
            },
        },
    ];
    return (
        <div>
            <h1>bots</h1>
            <Table dataSource={bots} columns={columns} rowKey="_id" />
        </div>
    );
}

export default BotList;