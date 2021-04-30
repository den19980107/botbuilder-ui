import React from 'react'
import { Handle } from './handle'
import { Position } from 'react-flow-renderer';

interface ResultNodeProps {
    data: any
}

export const ResultNode: React.FC<ResultNodeProps> = ({ data }) => {
    const NodeLabelName = data.label;
    return (
        <>
            <div style={{ border: "0.5px solid #ccc", borderRadius: "5px", background: "#fff" }}>
                <div style={{ display: "flex" }} >
                    <div style={{ width: "20px", background: "#00897b" }}></div>
                    <div style={{ minWidth: "200px", padding: "0 1rem" }}>
                        <div style={{ alignItems: "center", textAlign: "center", padding: "0.5rem" }}>
                            <h3 style={{ padding: "0", margin: 0 }}>{NodeLabelName}</h3>
                        </div>
                    </div>
                </div>
            </div>

            <Handle
                type="target"
                position={Position.Left}
            ></Handle>
        </>
    );
}