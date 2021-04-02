import React, { memo } from 'react'
import { Handle, Position } from 'react-flow-renderer';

interface ConditionNodeProps {
    data: any
}

export const ConditionNode: React.FC<ConditionNodeProps> = memo(({ data }) => {
    return (
        <>
            <Handle
                type="target"
                position={Position.Left}
                style={{ background: '#555' }}
                onConnect={(params) => console.log('handle onConnect', params)}
            />
            <div style={{ padding: "0.5rem 0.5rem 0.5rem 1rem", border: "0.5px solid #ccc", borderRadius: "5px", display: "flex" }}>
                <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", marginRight: "1rem" }}>
                    <span>CONDITION</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <div>true</div>
                    <div>false</div>
                </div>
            </div>
            <Handle
                type="source"
                position={Position.Right}
                id="true"
                style={{ top: 20, background: '#555' }}
            />
            <Handle
                type="source"
                position={Position.Right}
                id="false"
                style={{ bottom: 15, top: 'auto', background: '#555' }}
            />
        </>
    );
})