import React, { useContext } from 'react'
import { Resource, ScriptResourceContext } from '../context/scriptResourceContext';

export type ResourceType = 'flowVariable' | 'scriptVariable' | 'route' | 'table' | 'script';

export const UseScriptResourceRegister = () => {
    const {
        setFlowVariable,
        setScriptVariable,
        setRoutes,
        setTables,
        setScripts,
        flowVariable,
        scriptVariable,
        routes,
        tables,
        scripts
    } = useContext(ScriptResourceContext);

    const registerVariableToContext = (value: string, nodeId: string, type: ResourceType) => {
        let datas;
        let setData;
        switch (type) {
            case "flowVariable":
                datas = flowVariable;
                setData = setFlowVariable;
                break;
            case "scriptVariable":
                datas = scripts;
                setData = setScriptVariable;
                break;
            case "route":
                datas = routes;
                setData = setRoutes;
                break;
            case "table":
                datas = tables;
                setData = setTables;
                break;
            case "script":
                datas = scripts;
                setData = setScripts;
                break;
        }

        const variable = datas.filter(data => data.id === nodeId)[0];
        if (!variable) {
            datas.push({
                id: nodeId,
                value
            })
        } else {
            datas.map(variable => {
                if (variable.id === nodeId) {
                    variable.value = value
                }
                return variable
            })
        }
        setData(datas);
    }

    return {
        registerVariableToContext
    }
}
