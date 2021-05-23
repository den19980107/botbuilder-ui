import React, { createContext } from 'react'
import { Elements, FlowElement, Node } from 'react-flow-renderer'

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