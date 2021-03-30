import { v4 as uuidv4 } from 'uuid';

export const createEdgeId = () => {
    return `edge_${uuidv4()}`;
}

export const createNodeId = () => {
    return `node_${uuidv4()}`;
}