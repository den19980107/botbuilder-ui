import React from 'react'
import { Handle } from './handle'
import { Position } from 'react-flow-renderer';

interface MoudleStartNodeProps {
	data: any
}

export const MoudleStartNode: React.FC<MoudleStartNodeProps> = ({ data }) => {
	return (
		<>
			<div style={{ border: "0.5px solid #ccc", borderRadius: "5px", background: "#f44336" }}>
				<div style={{ minWidth: "150px", padding: "0 1rem" }}>
					<div style={{ alignItems: "center", textAlign: "center", padding: "0.5rem" }}>
						<h3 style={{ padding: "0", color: "white", margin: 0 }}>Moudle Start</h3>
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