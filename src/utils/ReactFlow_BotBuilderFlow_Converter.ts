import { Edge, Elements } from "react-flow-renderer";
import { v4 as uuidv4 } from 'uuid'
// TODO 之後想辦法整合後端型態
interface SCRIPT {
    [key: string]: FLOW
}
// TODO 之後想辦法整合後端型態
interface NODE {
    name: string,
    type: string,
    payload: any,
    next_node_id: string | null
}
// TODO 之後想辦法整合後端型態
interface FLOW {
    [key: string]: NODE
}


export const reactFlowToBotBuilderFlow = (elements: Elements<any>): SCRIPT => {
    const script: SCRIPT = {};
    const inputIds: string[] = []
    const nodePool: { [key: string]: NODE } = {}

    for (let i = 0; i < elements.length; i++) {
        const el = elements[i];
        if (el.id.includes("node_")) {
            const node: NODE = {
                name: el.data.label,
                type: el.data.type,
                payload: el.data.payload,
                next_node_id: null
            }
            nodePool[el.id] = node;
            if (el.type === "input") {
                inputIds.push(el.id)
            }
        }
        else if (el.id.includes("edge_")) {
            const edge = el as Edge
            nodePool[edge.source].next_node_id = edge.target
        }
    }
    for (let i = 0; i < inputIds.length; i++) {
        const flow: FLOW = {}
        let next_node_Id: string | null = inputIds[i]

        while (next_node_Id) {
            let node = nodePool[next_node_Id]
            flow[`${next_node_Id}`] = node;
            next_node_Id = node.next_node_id
        }
        script[`flow_${uuidv4()}`] = flow
    }
    return script
}