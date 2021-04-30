import React from 'react'
import { Handle } from './handle'
import { Position } from 'react-flow-renderer';

interface ProcessNodeProps {
    data: any
}

export const ProcessNode: React.FC<ProcessNodeProps> = ({ data }) => {
    const NodeLabelName = data.label;
    return (
        <>
            <Handle
                type="target"
                position={Position.Left}
            ></Handle>
            <div style={{ border: "0.5px solid #ccc", borderRadius: "5px", background: "#fff" }}>
                <div style={{ display: "flex" }} >
                    <div style={{ width: "20px", background: "#8bf6ff" }}></div>
                    <div style={{ minWidth: "200px", padding: "0 1rem" }}>
                        <div style={{ alignItems: "center", textAlign: "center", padding: "0.5rem" }}>
                            <h3 style={{ padding: "0", margin: 0 }}>{NodeLabelName}</h3>
                        </div>
                        {/* 每個 node 的 preview layout */}
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