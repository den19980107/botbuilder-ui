import React, { createContext } from 'react'
import { Edge, Elements, isEdge } from 'react-flow-renderer'

export interface Resource {
    value: string,
    id: string
}

interface scriptResourceContext {
    // 同一流程中才能取用的變數
    flowVariable: Resource[],
    // 同一腳本中才能取用的變數
    scriptVariable: Resource[],
    // 此 user 目前定義的所有 route
    routes: Resource[],
    // 此 user 目前定義的所有 table
    tables: Resource[],
    // 此 user 目前定義的所有 腳本
    scripts: Resource[],
    setFlowVariable: React.Dispatch<React.SetStateAction<Resource[]>>,
    setScriptVariable: React.Dispatch<React.SetStateAction<Resource[]>>,
    setRoutes: React.Dispatch<React.SetStateAction<Resource[]>>,
    setTables: React.Dispatch<React.SetStateAction<Resource[]>>,
    setScripts: React.Dispatch<React.SetStateAction<Resource[]>>
}

export const ScriptResourceContext = createContext<scriptResourceContext>({
    flowVariable: [],
    scriptVariable: [],
    routes: [],
    tables: [],
    scripts: [],
    setFlowVariable: () => { },
    setScriptVariable: () => { },
    setRoutes: () => { },
    setTables: () => { },
    setScripts: () => { }
})


export const getFlowVariable = (nodeId: string, elements: Elements<any>, flowVariable: Array<Resource>): Resource[] => {
    const edges = elements.filter(e => isEdge(e)) as Array<Edge>;
    // 用來紀錄 一個 nodeId 的 上一個 nodeId 是誰
    const map: { [key: string]: string } = {}
    for (const edge of edges) {
        map[edge.target] = edge.source;
    }
    let parentNodeId = map[nodeId];
    let resource: Array<Resource> = [];
    while (parentNodeId) {
        const flowResource = flowVariable.filter(f => f.id === parentNodeId)[0];
        if (flowResource) resource.push(flowResource);
        parentNodeId = map[parentNodeId]
    }
    return resource;
}