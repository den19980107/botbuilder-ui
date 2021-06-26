import React from 'react'
import { Handle } from './handle'
import { Position } from 'react-flow-renderer';

interface MoudleEndNodeProps {
	data: any
}

export const MoudleEndNode: React.FC<MoudleEndNodeProps> = ({ data }) => {
	return (
		<>
			<div style={{ border: "0.5px solid #ccc", borderRadius: "5px", background: "#4caf50" }}>
				<div style={{ minWidth: "150px", padding: "0 1rem" }}>
					<div style={{ alignItems: "center", textAlign: "center", padding: "0.5rem" }}>
						<h3 style={{ padding: "0", color: "white", margin: 0 }}>Moudle End</h3>
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