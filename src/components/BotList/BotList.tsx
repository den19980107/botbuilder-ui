import { message, Table } from 'antd';
import React, { useState } from 'react'
import { useQueryClient } from 'react-query';
import { useCreateScript, useDeleteScript } from '../../api/script';
import queryKeys from '../../api/queryKeys';
import history from '../../history';
import Script from '../../types/script';

interface BotListProps {
    bots: Array<Script>
}


export const BotList: React.FC<BotListProps> = ({ bots }) => {
    const queryClient = useQueryClient();
    const [botName, setBotName] = useState<string>("");
    const [script, setScript] = useState<string>("");

    const createBotMutation = useCreateScript({
        onSuccess: () => {
            queryClient.invalidateQueries(queryKeys.user.SCRIPTS)
            message.success("新增成功！")
            setBotName("");
            setScript("");
        }
    })

    const deleteBotMutation = useDeleteScript({
        onSuccess: () => {
            queryClient.invalidateQueries(queryKeys.user.SCRIPTS)
            message.success("刪除成功！")
        }
    })


    const columns = [
        {
            title: '名稱',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '',
            dataIndex: '',
            key: 'x',
            render: (record) => {
                return <a onClick={() => deleteBotMutation({ scriptId: record._id })}>刪除</a>
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
        <Table dataSource={bots} columns={columns} rowKey="_id" />
    );
}
