import React from 'react'
import { Handle as ReactFlowHandle, HandleType, Position } from 'react-flow-renderer';
interface HandleProps {
    type: HandleType,
    position: Position,
    id?: string,
    style?: React.CSSProperties
}

export const Handle: React.FC<HandleProps> = ({ type, position, id, style }) => {
    return (
        <ReactFlowHandle
            type={type}
            position={position}
            id={id}
            style={{ background: '#555', width: "10px", height: "10px", borderRadius: "50%", ...style }}
        />
    );
}