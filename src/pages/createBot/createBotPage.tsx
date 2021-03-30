import { Button, message } from 'antd';
import React, { useState } from 'react'
import { ArrowHeadType, Elements, ReactFlowProvider, Node, Position } from 'react-flow-renderer'
import { useQueryClient } from 'react-query';
import { useCreateBot } from '../../api/bot';
import { reactFlowToBotBuilderFlow } from '../../utils/ReactFlow_BotBuilderFlow_Converter';
import { FlowElementsContext } from './flowElementsContext';
import { ReactFlowContainer } from './reactFlowContainer';

interface CreateBotPageProps {

}

export const CreateBotPage: React.FC<CreateBotPageProps> = ({ }) => {
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
                <ReactFlowContainer></ReactFlowContainer>
                <Button onClick={() => {
                    const script = reactFlowToBotBuilderFlow(elements)
                    console.log(script)
                    createBotMutation({
                        name: "test",
                        script: JSON.stringify(script)
                    })
                }}>新增 bot</Button>
            </FlowElementsContext.Provider>
        </ReactFlowProvider>

    );
}