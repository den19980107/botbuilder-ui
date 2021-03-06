import React, { memo } from 'react'
import { Position } from 'react-flow-renderer';
import { Handle } from './handle'

interface ConditionNodeProps {
    data: any
}

export const ConditionNode: React.FC<ConditionNodeProps> = memo(({ data }) => {
    const NodeLabelName = data.label;
    return (
        <>
            <Handle
                type="target"
                position={Position.Left}
            />
            <div style={{ border: "0.5px solid #ccc", borderRadius: "5px", background: "#fff" }}>
                <div style={{ display: "flex" }} >
                    <div style={{ width: "20px", background: "#2e7d32" }}></div>
                    <div style={{ minWidth: "200px", padding: "0 1rem" }}>
                        <div style={{ alignItems: "center", textAlign: "center", padding: "0.5rem" }}>
                            <h3 style={{ padding: "0", margin: 0 }}>{NodeLabelName}</h3>
                        </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", paddingRight: "0.5rem" }}>
                        <div>true</div>
                        <div>false</div>
                    </div>
                </div>
            </div>
            <Handle
                type="source"
                position={Position.Right}
                id="true"
                style={{ top: 12 }}
            ></Handle>
            <Handle
                type="source"
                position={Position.Right}
                id="false"
                style={{ top: 34 }}
            />
        </>
    );
})