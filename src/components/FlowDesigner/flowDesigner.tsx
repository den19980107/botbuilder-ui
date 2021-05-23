import { Button, Input } from "antd";
import React, { useEffect, useState } from "react";
import { Elements, Node, ReactFlowProvider } from "react-flow-renderer";
import { ScriptElementsContext } from "./context/scriptElementsContext";
import { ScriptResourceContext, Resource } from "./context/scriptResourceContext";
import { ReactFlowContainer } from "./reactFlowContainer";

interface FlowDesignerProps {
    initialbotname?: string;
    initialElements?: Elements<any>;
    initialFlowVariable?: Resource[];
    initialScriptVariable?: Resource[];
    initialRoutes?: Resource[];
    initialTables?: Resource[];
    initialScripts?: Resource[];
    onSave: (name: string, elements: Elements<any>) => void;
}

export const FlowDesigner: React.FC<FlowDesignerProps> = ({
    initialbotname,
    initialElements,
    initialFlowVariable,
    initialScriptVariable,
    initialRoutes,
    initialTables,
    initialScripts,
    onSave,
}) => {
    const [botName, setBotName] = useState<string>(initialbotname || "");

    // script elements
    const [elements, setElements] = useState<Elements<any>>(initialElements || []);
    const [currentDragElement, setCurrentDragElement] = useState<Node | null>(null);
    const [currentSelectElement, setCurrentSelectElement] = useState<Node | null>(null);
    // end of script elements

    // script resource
    const [flowVariable, setFlowVariable] = useState<Resource[]>(initialFlowVariable || []);
    const [scriptVariable, setScriptVariable] = useState<Resource[]>(initialScriptVariable || []);
    const [routes, setRoutes] = useState<Resource[]>(initialRoutes || []);
    const [tables, setTables] = useState<Resource[]>(initialTables || []);
    const [scripts, setScripts] = useState<Resource[]>(initialScripts || []);
    // end of script resource

    useEffect(() => {
        console.log(initialElements, initialbotname);
    }, []);

    return (
        <ReactFlowProvider>
            <ScriptElementsContext.Provider
                value={{
                    elements,
                    setElements,
                    currentDragElement,
                    setCurrentDragElement,
                    currentSelectElement,
                    setCurrentSelectElement,
                }}
            >
                <ScriptResourceContext.Provider
                    value={{
                        flowVariable,
                        scriptVariable,
                        routes,
                        tables,
                        scripts,
                        setFlowVariable,
                        setScriptVariable,
                        setRoutes,
                        setTables,
                        setScripts
                    }}
                >
                    <div style={{ display: "flex", marginBottom: "1rem" }}>
                        <Input
                            value={botName}
                            onChange={(e) => setBotName(e.target.value)}
                            placeholder="請輸入 bot 名稱"
                        ></Input>
                        <Button
                            onClick={() => {
                                onSave(botName, elements);
                            }}
                        >儲存</Button>
                    </div>
                    <ReactFlowContainer></ReactFlowContainer>
                </ScriptResourceContext.Provider>
            </ScriptElementsContext.Provider>
        </ReactFlowProvider>
    );
};

