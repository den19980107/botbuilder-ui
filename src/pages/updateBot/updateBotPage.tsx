import { message } from 'antd';
import React, { useContext, useEffect } from 'react'
import { useQueryClient } from 'react-query';
import { useParams } from 'react-router';
import { useBotData, useUpdateBot } from '../../api/bot';
import queryKeys from '../../api/queryKeys';
import { FlowDesigner } from '../../components/FlowDesigner';
import { ScriptResourceContext } from '../../components/FlowDesigner/context/scriptResourceContext';
import history from '../../history';

interface ParamTypes {
    id: string
}

interface UpdateBotPageProps {

}

export const UpdateBotPage: React.FC<UpdateBotPageProps> = ({ }) => {
    const { id } = useParams<ParamTypes>();
    const { data, isLoading, error } = useBotData(id)
    const { flowVariable } = useContext(ScriptResourceContext)

    const queryClient = useQueryClient();
    const updateBotMutation = useUpdateBot({
        onSuccess: () => {
            queryClient.invalidateQueries(queryKeys.user.BOTS);
            queryClient.invalidateQueries(queryKeys.bot.BOT)
            message.success("更新成功！")
            history.push("/")
        }
    })

    /**
     * 如果需要 react query 每次進來都重新 fetch 一次，要先把他儲存的 remove 掉 才不會拿到舊的資料
     */
    useEffect(() => {
        return () => {
            queryClient.removeQueries(queryKeys.bot.BOT);
        }
    }, [])

    if (isLoading) return <div>loading...</div>
    if (error) return <div>error</div>
    if (data && data.nodes) {
        const nodes = JSON.parse(data.nodes)
        return (
            <FlowDesigner
                initialFlowVariable={flowVariable}
                initialbotname={data.name}
                initialElements={nodes}
                onSave={(name, elements) => {
                    updateBotMutation({
                        name: name,
                        nodes: JSON.stringify(elements),
                        botId: id
                    })
                }}
            ></FlowDesigner>
        )
    }
    return (
        <div>error</div>
    );
}
