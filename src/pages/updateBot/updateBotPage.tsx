import { message } from 'antd';
import React, { useContext, useEffect } from 'react'
import { useQueryClient } from 'react-query';
import { useParams } from 'react-router';
import { useScriptData, useUpdateScript } from '../../api/script';
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
    const { data, isLoading, error } = useScriptData(id)
    const { flowVariable } = useContext(ScriptResourceContext)

    const queryClient = useQueryClient();
    const updateBotMutation = useUpdateScript({
        onSuccess: () => {
            queryClient.invalidateQueries(queryKeys.user.SCRIPTS);
            queryClient.invalidateQueries(queryKeys.script.SCRIPT)
            message.success("更新成功！")
            history.push("/")
        }
    })

    /**
     * 如果需要 react query 每次進來都重新 fetch 一次，要先把他儲存的 remove 掉 才不會拿到舊的資料
     */
    useEffect(() => {
        return () => {
            queryClient.removeQueries(queryKeys.script.SCRIPT);
        }
    }, [])

    if (isLoading) return <div>loading...</div>
    if (error) return <div>error</div>
    if (data && data.nodes) {
        const nodes = JSON.parse(data.nodes)
        return (
            <FlowDesigner
                initialFlowVariable={flowVariable}
                initialScriptName={data.name}
                initialIsMoudle={data.isMoudle}
                initialElements={nodes}
                onSave={(name, elements, isMoudle) => {
                    updateBotMutation({
                        name: name,
                        nodes: JSON.stringify(elements),
                        scriptId: id,
                        isMoudle
                    })
                }}
            ></FlowDesigner>
        )
    }
    return (
        <div>error</div>
    );
}
