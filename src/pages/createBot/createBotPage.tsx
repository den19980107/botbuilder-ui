import React, { useContext } from 'react'
import { message } from 'antd';
import { useQueryClient } from 'react-query';
import { useCreateBot } from '../../api/bot';
import history from '../../history';
import { FlowDesigner } from '../../components/FlowDesigner'
import queryKeys from '../../api/queryKeys';
import { ScriptResourceContext } from '../../components/FlowDesigner/context/scriptResourceContext';
interface CreateBotPageProps {

}

export const CreateBotPage: React.FC<CreateBotPageProps> = ({ }) => {
    const { flowVariable } = useContext(ScriptResourceContext)
    const queryClient = useQueryClient();
    const createBotMutation = useCreateBot({
        onSuccess: () => {
            queryClient.invalidateQueries(queryKeys.user.BOTS)
            message.success("新增成功！")
            history.push("/")
        }
    })
    return (
        <FlowDesigner initialFlowVariable={flowVariable} onSave={(name, elements) => {
            createBotMutation({
                name: name,
                nodes: JSON.stringify(elements)
            })
        }}></FlowDesigner>
    );
}
