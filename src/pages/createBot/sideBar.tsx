import React, { useContext } from 'react'
import { Button } from 'antd';
import NodeType from '../../constant/nodeType.constants'
import { FlowElement } from 'react-flow-renderer';
import { FlowElementsContext } from './flowElementsContext';
import { createNodeId } from './util/createId'
interface SideBarProps {

}

export const SideBar: React.FC<SideBarProps> = ({ }) => {
    const { setCurrentDragElement } = useContext(FlowElementsContext)
    const onDragStart = (event, ReactFlowNodeType, type) => {
        const dragElement: FlowElement = {
            id: createNodeId(),
            type: ReactFlowNodeType,
            position: { x: 0, y: 0 },
            data: {
                type,
                label: `${type}`
            }
        };

        switch (type) {
            case NodeType.WEB_HOOK:
                dragElement.data.payload = {
                    route: "",
                    method: "GET",
                    storeBodyAt: "DATA"
                }
                break;
            case NodeType.FETCH_DATA:
                dragElement.data.payload = {
                    url: "",
                    method: "GET",
                    body: "",
                    header: "",
                    storeDataAt: "DATA"
                }
                break;
            case NodeType.HTTP_RESPONSE:
                dragElement.data.payload = {
                    statusCode: 200,
                    responseData: `{"message":"ok!"}`,
                }
                break;
        }
        setCurrentDragElement(dragElement)
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <aside>
            <Button onDragStart={(event) => onDragStart(event, 'input', NodeType.WEB_HOOK)} draggable>
                WebHook
            </Button>
            <Button onDragStart={(event) => onDragStart(event, 'default', NodeType.FETCH_DATA)} draggable>
                Fetch Data
            </Button>
            <Button onDragStart={(event) => onDragStart(event, 'output', NodeType.HTTP_RESPONSE)} draggable>
                HTTP Response
            </Button>
        </aside>
    );
}