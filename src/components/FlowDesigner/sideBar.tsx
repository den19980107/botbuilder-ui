import React, { useContext } from 'react'
import { Button } from 'antd';
import { FlowElement } from 'react-flow-renderer';
import { FlowElementsContext } from './flowElementsContext';
import { createNodeId } from './util/createId'

import { Constants } from 'botbuilder-share'
const { NodeType } = Constants;

interface node {
    label: string,
    nodeType: string,
    reactFlowNodeType: string,
    payload: any
}
const Nodes: node[] = [
    {
        label: "🧑‍⚖️ 判斷條件",
        nodeType: NodeType.CONDITION,
        reactFlowNodeType: "condition",
        payload: {
            condition: "#FLOW_SHARE_VARIABLE.Something"
        }
    },
    {
        label: "🛠 建立 API",
        nodeType: NodeType.WEB_HOOK,
        reactFlowNodeType: "event",
        payload: {
            route: "",
            method: "GET",
            storeBodyAt: "DATA"
        }
    },
    {
        label: "📁 呼叫 API",
        nodeType: NodeType.FETCH_DATA,
        reactFlowNodeType: "process",
        payload: {
            url: "",
            method: "GET",
            body: "",
            header: "",
            storeDataAt: "DATA"
        }
    },
    {
        label: "✅ 傳送 Response",
        nodeType: NodeType.HTTP_RESPONSE,
        reactFlowNodeType: "result",
        payload: {
            statusCode: 200,
            responseData: `{"message":"ok!"}`,
        }
    },
    {
        label: "➕ 插入一行資料",
        nodeType: NodeType.INSERT_ROW,
        reactFlowNodeType: "process",
        payload: {

        }
    },
    {
        label: "📅 排程",
        nodeType: NodeType.SCHEDULE,
        reactFlowNodeType: "event",
        payload: {

        }
    },
    {
        label: "新增變數",
        nodeType: NodeType.DECLAR_VARIABLE,
        reactFlowNodeType: "process",
        payload: {

        }
    },
    {
        label: "重新導向",
        nodeType: NodeType.REDIRECT,
        reactFlowNodeType: "result",
        payload: {

        }
    }
]

interface SideBarProps {

}

export const SideBar: React.FC<SideBarProps> = ({ }) => {
    const { setCurrentDragElement } = useContext(FlowElementsContext)
    const onDragStart = (event, ReactFlowNodeType, label, type, payload) => {
        console.log(label)
        const dragElement: FlowElement = {
            id: createNodeId(),
            type: ReactFlowNodeType,
            position: { x: 0, y: 0 },
            data: {
                type,
                label: `${label}`,
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
                        <Button style={{ width: "100%", marginBottom: "1rem" }} onDragStart={(event) => onDragStart(event, node.reactFlowNodeType, node.label, node.nodeType, node.payload)} draggable>
                            {node.label}
                        </Button>
                    )
                })
            }
        </aside>
    );
}