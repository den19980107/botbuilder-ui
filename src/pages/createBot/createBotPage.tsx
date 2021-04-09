import React from 'react'
import { message } from 'antd';
import { useQueryClient } from 'react-query';
import { useCreateBot } from '../../api/bot';
import history from '../../history';
import { FlowDesigner } from '../../components/FlowDesigner'
import queryKeys from '../../api/queryKeys';
interface CreateBotPageProps {

}

export const CreateBotPage: React.FC<CreateBotPageProps> = ({ }) => {

    const queryClient = useQueryClient();
    const createBotMutation = useCreateBot({
        onSuccess: () => {
            queryClient.invalidateQueries(queryKeys.user.BOTS)
            message.success("新增成功！")
            history.push("/")
        }
    })
    return (
        <FlowDesigner onSave={(name, elements) => {
            createBotMutation({
                name: name,
                nodes: JSON.stringify(elements)
            })
        }}></FlowDesigner>
    );
}
