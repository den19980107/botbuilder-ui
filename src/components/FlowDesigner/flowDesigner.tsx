import { Button, Input } from "antd";
import React, { useEffect, useState } from "react";
import { Elements, Node, ReactFlowProvider } from "react-flow-renderer";
import { FlowElementsContext } from "./flowElementsContext";
import { ReactFlowContainer } from "./reactFlowContainer";

interface FlowDesignerProps {
    initialbotname?: string;
    initialElements?: Elements<any>;
    onSave: (name: string, elements: Elements<any>) => void;
}

export const FlowDesigner: React.FC<FlowDesignerProps> = ({
    initialbotname,
    initialElements,
    onSave,
}) => {
    const [botName, setBotName] = useState<string>(initialbotname || "");
    const [elements, setElements] = useState<Elements<any>>(
        initialElements || []
    );
    const [currentDragElement, setCurrentDragElement] = useState<Node | null>(
        null
    );
    const [currentSelectElement, setCurrentSelectElement] = useState<Node | null>(
        null
    );

    useEffect(() => {
        console.log(initialElements, initialbotname);
    }, []);

    return (
        <ReactFlowProvider>
            <FlowElementsContext.Provider
                value={{
                    elements,
                    setElements,
                    currentDragElement,
                    setCurrentDragElement,
                    currentSelectElement,
                    setCurrentSelectElement,
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
            </FlowElementsContext.Provider>
        </ReactFlowProvider>
    );
};

