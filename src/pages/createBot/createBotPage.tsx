import { Button, Input, message } from 'antd';
import React, { useState } from 'react'
import { ArrowHeadType, Elements, ReactFlowProvider, Node, Position } from 'react-flow-renderer'
import { useQueryClient } from 'react-query';
import { useCreateBot } from '../../api/bot';
import history from '../../history';
import { reactFlowToBotBuilderFlow } from '../../utils/ReactFlow_BotBuilderFlow_Converter';
import { FlowElementsContext } from './flowElementsContext';
import { ReactFlowContainer } from './reactFlowContainer';

interface CreateBotPageProps {

}

export const CreateBotPage: React.FC<CreateBotPageProps> = ({ }) => {
    const [botName, setBotName] = useState<string>();
    const [elements, setElements] = useState<Elements<any>>([]);
    const [currentDragElement, setCurrentDragElement] = useState<Node | null>(null)
    const [currentSelectElement, setCurrentSelectElement] = useState<Node | null>(null)

    const queryClient = useQueryClient();
    const createBotMutation = useCreateBot({
        onSuccess: () => {
            queryClient.invalidateQueries("bots")
            message.success("新增成功！")
        }
    })
    return (
        // TODO 建立一個 context provider 讓這些 component 都能存取節點(elements)的 state
        <ReactFlowProvider>
            <FlowElementsContext.Provider value={{ elements, setElements, currentDragElement, setCurrentDragElement, currentSelectElement, setCurrentSelectElement }}>
                <div style={{ display: "flex", marginBottom: "1rem" }}>
                    <Input onChange={(e) => setBotName(e.target.value)} placeholder="請輸入 bot 名稱"></Input>
                    <Button onClick={() => {
                        const script = reactFlowToBotBuilderFlow(elements)
                        if (botName) {
                            createBotMutation({
                                name: botName,
                                script: JSON.stringify(script)
                            })
                            history.push("/")
                        } else {
                            message.error("請輸入 bot 名稱！")
                        }
                    }}>新增 bot</Button>
                </div>
                <ReactFlowContainer></ReactFlowContainer>
            </FlowElementsContext.Provider>
        </ReactFlowProvider>

    );
}