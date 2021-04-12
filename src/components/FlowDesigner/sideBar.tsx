import React, { useContext } from 'react'
import { Button } from 'antd';
import NodeType from '../../constant/nodeType.constants'
import { FlowElement } from 'react-flow-renderer';
import { FlowElementsContext } from './flowElementsContext';
import { createNodeId } from './util/createId'

interface node {
    name: string,
    nodeType: NodeType,
    reactFlowNodeType: string,
    payload: any
}
const Nodes: node[] = [
    {
        name: "Condition",
        nodeType: NodeType.CONDITION,
        reactFlowNodeType: "condition",
        payload: {
            condition: "#FLOW_SHARE_VARIABLE.Something"
        }
    },
    {
        name: "WebHook",
        nodeType: NodeType.WEB_HOOK,
        reactFlowNodeType: "input",
        payload: {
            route: "",
            method: "GET",
            storeBodyAt: "DATA"
        }
    },
    {
        name: "Fetch Data",
        nodeType: NodeType.FETCH_DATA,
        reactFlowNodeType: "default",
        payload: {
            url: "",
            method: "GET",
            body: "",
            header: "",
            storeDataAt: "DATA"
        }
    },
    {
        name: "Http Response",
        nodeType: NodeType.HTTP_RESPONSE,
        reactFlowNodeType: "output",
        payload: {
            statusCode: 200,
            responseData: `{"message":"ok!"}`,
        }
    }
]

interface SideBarProps {

}

export const SideBar: React.FC<SideBarProps> = ({ }) => {
    const { setCurrentDragElement } = useContext(FlowElementsContext)
    const onDragStart = (event, ReactFlowNodeType, type, payload) => {
        const dragElement: FlowElement = {
            id: createNodeId(),
            type: ReactFlowNodeType,
            position: { x: 0, y: 0 },
            data: {
                type,
                label: `${type}`,
                payload
            }
        };
        setCurrentDragElement(dragElement)
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <aside style={{ background: "rgb(247,247,247)", padding: "1rem", height: "100%" }}>
            {
                Nodes.map(node => {
                    console.log(node.payload)
                    return (
                        <Button style={{ width: "100%", marginBottom: "1rem" }} onDragStart={(event) => onDragStart(event, node.reactFlowNodeType, node.nodeType, node.payload)} draggable>
                            {node.name}
                        </Button>
                    )
                })
            }
        </aside>
    );
}