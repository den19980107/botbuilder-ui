import { Button, Input, Switch } from "antd";
import { NodeType } from "botbuilder-share/lib/constants";
import React, { useEffect, useState } from "react";
import { Elements, FlowElement, Node, ReactFlowProvider } from "react-flow-renderer";
import { ScriptElementsContext } from "./context/scriptElementsContext";
import { ScriptResourceContext, Resource } from "./context/scriptResourceContext";
import { ReactFlowContainer } from "./reactFlowContainer";

interface FlowDesignerProps {
    initialbotname?: string;
    initialIsMoudle?: boolean;
    initialElements?: Elements<any>;
    initialFlowVariable?: Resource[];
    initialScriptVariable?: Resource[];
    initialRoutes?: Resource[];
    initialTables?: Resource[];
    initialScripts?: Resource[];
    onSave: (name: string, elements: Elements<any>, isMoudle: boolean) => void;
}

export const FlowDesigner: React.FC<FlowDesignerProps> = ({
    initialbotname,
    initialIsMoudle = false,
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

    const [isMoudle, setIsMoudle] = useState<boolean>(initialIsMoudle);

    const startNodeId = "node_moudle_start";
    const endNodeId = "node_moudle_end";

    useEffect(() => {
        if (isMoudle) {
            addMoudleStartAndEndNode()
        } else {
            removeMoudleStartAndEndNode()
        }
    }, [isMoudle]);


    const addMoudleStartAndEndNode = () => {
        // 先檢查 element 中是否已經有 start node 和 end node
        if (elements.find(e => e.id === startNodeId || e.id === endNodeId)) {
            console.log("already have start and end node")
            return
        }
        const startNode: FlowElement = {
            id: startNodeId,
            type: "moudleStart",
            position: { x: 0, y: 200 },
            data: {
                type: NodeType.MOUDLE_START,
                label: "Start",
                payload: {},
                needToRegister: []
            }
        };
        const endNode: FlowElement = {
            id: endNodeId,
            type: "moudleEnd",
            position: { x: 500, y: 200 },
            data: {
                type: NodeType.MOUDLE_END,
                label: "End",
                payload: {},
                needToRegister: []
            }
        };
        setElements([...elements, startNode, endNode])
    }

    const removeMoudleStartAndEndNode = () => {
        setElements(elements.filter(e => e.id !== startNodeId && e.id !== endNodeId));
    }

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
                                onSave(botName, elements, isMoudle);
                            }}
                        >儲存</Button>
                    </div>
                    <div>
                        <span>作為模組：</span>
                        <Switch checked={isMoudle} onChange={(value) => { setIsMoudle(value) }} />
                    </div>
                    <ReactFlowContainer></ReactFlowContainer>
                </ScriptResourceContext.Provider>
            </ScriptElementsContext.Provider>
        </ReactFlowProvider>
    );
};

