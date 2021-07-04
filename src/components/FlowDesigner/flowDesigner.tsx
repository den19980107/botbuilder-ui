import { Button, Form, Input, Switch } from "antd";
import { NodeType } from "botbuilder-share/lib/constants";
import React, { useEffect, useState } from "react";
import { Elements, FlowElement, Node, ReactFlowProvider } from "react-flow-renderer";
import { ScriptElementsContext } from "./context/scriptElementsContext";
import { ScriptResourceContext, Resource } from "./context/scriptResourceContext";
import { ReactFlowContainer } from "./reactFlowContainer";
import { SideBar } from "./sideBar";

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
                    <div style={{ display: "flex", height: "100%" }}>
                        <div style={{ flex: 2, background: "rgb(247,247,247)", padding: "1rem" }}>
                            <Form
                                layout="vertical"
                                initialValues={{ remember: true }}
                                onFinish={(data) => onSave(data.scriptName, elements, data.isMoudle)}
                            >
                                <Form.Item
                                    label="腳本名稱"
                                    name="scriptName"
                                    rules={[{ required: true, message: '請輸入腳本名稱' }]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label="設為模組"
                                    name="isMoudle"
                                    valuePropName="checked" >
                                    <Switch checked={isMoudle} onChange={(value) => { setIsMoudle(value) }} />
                                </Form.Item>

                                <Form.Item >
                                    <Button type="primary" htmlType="submit">
                                        儲存
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                        <div style={{ flex: 8 }}>
                            <ReactFlowContainer></ReactFlowContainer>
                        </div>
                        <div style={{ flex: 2 }}>
                            <SideBar></SideBar>
                        </div>
                    </div>
                </ScriptResourceContext.Provider>
            </ScriptElementsContext.Provider>
        </ReactFlowProvider>
    );
};

