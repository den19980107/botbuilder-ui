import React, { useContext, useEffect, useState } from 'react'
import NodeType from '../../../constant/nodeType.constants'
import { FlowElementsContext } from '../flowElementsContext'
// layout
import { WebhookFloatPannelLayout } from './layout/webhook.FloatPannelLayout'
import { FetchDataFloatPannelLayout } from './layout/fetchData.FloatPannelLayout'
import { HttpResponseFloatPannelLayout } from './layout/httpResponse.FloatPannelLayout'
import { FlowElement, removeElements } from 'react-flow-renderer'
import { message } from 'antd'
import { ConditionFloatPannelLayout } from './layout/condition.FloatPannelLayout'

interface FloatPanelProps {
    visiable: boolean,
    type: NodeType,
    data: any,
    nodeId: string
}

export const FloatPanel: React.FC<FloatPanelProps> = ({ visiable, data, type, nodeId }) => {
    const { elements, setElements, setCurrentSelectElement } = useContext(FlowElementsContext)
    const onChange = (payload) => {
        setElements(elements.map(el => {
            if (el.id === nodeId) {
                el.data.payload = payload;
            }
            return el
        }))
        message.success("儲存成功！")
        setCurrentSelectElement(null)
    }

    const onDelete = () => {
        setElements(elements.filter(el => el.id !== nodeId));
        setCurrentSelectElement(null)
    }
    const switchLayout = (data) => {
        switch (type) {
            case NodeType.WEB_HOOK:
                return <WebhookFloatPannelLayout payload={data} onChange={onChange} onDelete={onDelete} />
                break;
            case NodeType.FETCH_DATA:
                return <FetchDataFloatPannelLayout payload={data} onChange={onChange} onDelete={onDelete} />
                break;
            case NodeType.HTTP_RESPONSE:
                return <HttpResponseFloatPannelLayout payload={data} onChange={onChange} onDelete={onDelete} />
                break;
            case NodeType.CONDITION:
                return <ConditionFloatPannelLayout payload={data} onChange={onChange} onDelete={onDelete} />
                break;
        }
    }

    return (
        <div style={{ zIndex: 100, width: "500px", position: "absolute", left: 0, top: 0, padding: "1rem", background: "#fff", display: visiable ? "block" : "none", border: "0.5px solid #ccc", borderRadius: "1rem" }}>
            <h1 style={{ marginBottom: "2rem" }}>{type} 設定</h1>
            {switchLayout(data)}
        </div>
    );
}