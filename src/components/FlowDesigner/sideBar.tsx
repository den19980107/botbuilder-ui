import React, { useContext } from 'react'
import { Button } from 'antd';
import { FlowElement } from 'react-flow-renderer';
import { ScriptElementsContext } from './context/scriptElementsContext';
import { createNodeId } from './util/createId'

import { Constants } from 'botbuilder-share'
const { NodeType } = Constants;

interface node {
    label: string,
    nodeType: string,
    reactFlowNodeType: string,
    needToRegister: string[],
    payload: any
}
const Nodes: node[] = [
    {
        label: "🧑‍⚖️ 判斷條件",
        nodeType: NodeType.CONDITION,
        reactFlowNodeType: "condition",
        needToRegister: [],
        payload: {
        }
    },
    {
        label: "🛠 建立 API",
        nodeType: NodeType.WEB_HOOK,
        reactFlowNodeType: "event",
        needToRegister: ["storeBodyAt"],
        payload: {
        }
    },
    {
        label: "📁 呼叫 API",
        nodeType: NodeType.FETCH_DATA,
        reactFlowNodeType: "process",
        needToRegister: ["storeDataAt"],
        payload: {
        }
    },
    {
        label: "✅ 傳送 Response",
        nodeType: NodeType.HTTP_RESPONSE,
        reactFlowNodeType: "result",
        needToRegister: [],
        payload: {
        }
    },
    {
        label: "➕ 插入一行資料",
        nodeType: NodeType.INSERT_ROW,
        reactFlowNodeType: "process",
        needToRegister: [],
        payload: {

        }
    },
    {
        label: "📅 排程",
        nodeType: NodeType.SCHEDULE,
        reactFlowNodeType: "event",
        needToRegister: [],
        payload: {

        }
    },
    {
        label: "新增變數",
        nodeType: NodeType.DECLAR_VARIABLE,
        reactFlowNodeType: "process",
        needToRegister: ["key"],
        payload: {

        }
    },
    {
        label: "重新導向",
        nodeType: NodeType.REDIRECT,
        reactFlowNodeType: "result",
        needToRegister: [],
        payload: {

        }
    },
    {
        label: "子腳本",
        nodeType: NodeType.SCRIPT_MOUDLE,
        reactFlowNodeType: "scriptMoudle",
        needToRegister: [],
        payload: {
            scriptId: "60d5f842c20c582ffb4476a5",
            scriptName: "moudle script"
        }
    }
]

interface SideBarProps {

}

export const SideBar: React.FC<SideBarProps> = ({ }) => {
    const { setCurrentDragElement } = useContext(ScriptElementsContext)
    const onDragStart = (event, ReactFlowNodeType, label, type, payload, needToRegister) => {
        console.log(label)
        const dragElement: FlowElement = {
            id: createNodeId(),
            type: ReactFlowNodeType,
            position: { x: 0, y: 0 },
            data: {
                type,
                label: `${label}`,
                payload,
                needToRegister
            }
        };
        setCurrentDragElement(dragElement)
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <aside style={{ background: "rgb(247,247,247)", padding: "1rem", height: "100%" }}>
            {
                Nodes.map((node, idx) => {
                    return (
                        <Button key={idx} style={{ width: "100%", marginBottom: "1rem" }} onDragStart={(event) => onDragStart(event, node.reactFlowNodeType, node.label, node.nodeType, node.payload, node.needToRegister)} draggable>
                            {node.label}
                        </Button>
                    )
                })
            }
        </aside>
    );
}