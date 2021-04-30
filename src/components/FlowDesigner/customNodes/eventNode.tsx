import { Badge, Card, Divider } from 'antd';
import { NodeType } from 'botbuilder-share/lib/constants';
import React from 'react'
import { Handle } from './handle'

import { SchedulePreviewLayout } from '../floatPanel/layout/schedule.FloatPannelLayout';
import { WebhookPreviewLayout } from '../floatPanel/layout/webhook.FloatPannelLayout';
import { Position } from 'react-flow-renderer';

interface EventNodeProps {
    data: any
}

export const EventNode: React.FC<EventNodeProps> = ({ data }) => {
    const NodeLabelName = data.label;
    console.log(data)
    return (
        <>
            <div style={{ border: "0.5px solid #ccc", borderRadius: "5px", background: "#fff" }}>
                <div style={{ display: "flex" }} >
                    <div style={{ width: "20px", background: "#ffa726" }}></div>
                    <div style={{ minWidth: "200px", padding: "0 1rem" }}>
                        <div style={{ alignItems: "center", textAlign: "center", padding: "0.5rem" }}>
                            <h3 style={{ padding: "0", margin: 0 }}>{NodeLabelName}</h3>
                        </div>
                        {/* 每個 node 的 preview layout */}
                        {data.type === NodeType.SCHEDULE && <SchedulePreviewLayout payload={data.payload} />}
                        {data.type === NodeType.WEB_HOOK && <WebhookPreviewLayout payload={data.payload} />}
                    </div>
                </div>
            </div>

            <Handle
                type="source"
                position={Position.Right}
            ></Handle>
        </>
    );
}