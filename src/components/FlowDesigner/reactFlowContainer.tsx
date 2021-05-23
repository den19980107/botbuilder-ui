import React, { useContext, useEffect, useRef, useState } from 'react'
import ReactFlow, { addEdge, ArrowHeadType, Background, Connection, Controls, Edge, isNode, MiniMap, OnLoadParams, Position, updateEdge } from 'react-flow-renderer';
import { FloatPanel } from './floatPanel';
import { ScriptElementsContext } from './context/scriptElementsContext';
import { SideBar } from './sideBar'
import { createEdgeId } from './util/createId';

// import custom node
import { ConditionNode } from './customNodes/conditionNode'
import { EventNode } from './customNodes/eventNode'
import { ProcessNode } from './customNodes/process'
import { ResultNode } from './customNodes/resultNode'
import { UseScriptResourceRegister } from './util/useScriptResourceRegister';
const nodeTypes = {
    condition: ConditionNode,
    event: EventNode,
    process: ProcessNode,
    result: ResultNode
};

interface ReactFlowContainerProps {

}

export const ReactFlowContainer: React.FC<ReactFlowContainerProps> = ({ }) => {
    const { elements, setElements, currentDragElement, setCurrentDragElement, currentSelectElement, setCurrentSelectElement } = useContext(ScriptElementsContext)
    const [showFloatPanel, setShowFloatPanel] = useState<boolean>(false);
    const reactFlowWrapper = useRef<HTMLDivElement>(null);
    const [reactFlowInstance, setReactFlowInstance] = useState<OnLoadParams | null>(null);
    const { registerVariableToContext } = UseScriptResourceRegister();

    // 資源註冊初始化
    useEffect(() => {
        // 跑過 react flow 中每一個 element (Node and Edge)
        elements.forEach(el => {
            // 判斷是否是 Node
            if (isNode(el)) {
                // 跑過 needToRegister 中每一個 key
                el.data.needToRegister.forEach(registerKey => {
                    console.log(el.data.payload[registerKey])
                    // 用 key 去 payload 中找值，並把他註冊到 scriptResourceContext 中
                    if (el.data.payload[registerKey]) {
                        registerVariableToContext(el.data.payload[registerKey], el.id, "flowVariable");
                    }
                })
            }
        })
    }, [])

    const onLoad = (_reactFlowInstance: OnLoadParams) => {
        setReactFlowInstance(_reactFlowInstance);
    }
    const onConnect = (params: Edge<any> | Connection) => {
        const edge = params as Edge<any>
        edge.animated = true;
        edge.arrowHeadType = ArrowHeadType.ArrowClosed
        edge.id = createEdgeId();
        setElements(addEdge(params, elements))
    }
    const onDragOver = (event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    };

    /**
     * 當節點拖動結束時 更新節點 state 位置
     * @param event 
     * @param node 
     */
    const onNodeDragStop = (event, node) => {
        setElements(elements => elements.map(el => {
            if (el.id === node.id) {
                el = node
            }
            return el;
        }))
    }
    const onEdgeUpdate = (oldEdge, newConnection) => {
        console.log(oldEdge, newConnection)
        setElements((els) => updateEdge(oldEdge, newConnection, els));
    }
    const onElementClick = (event, element) => {
        setShowFloatPanel(true)
        setCurrentSelectElement(element)
    }
    const onReactFlowPannelClick = (event) => {
        setShowFloatPanel(false)
        setCurrentSelectElement(null);
    }

    const onDrop = (event) => {
        event.preventDefault();
        const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect();
        if (reactFlowInstance && reactFlowBounds && currentDragElement) {
            const position = reactFlowInstance.project({
                x: event.clientX - reactFlowBounds.left,
                y: event.clientY - reactFlowBounds.top,
            });

            const newNode = currentDragElement
            newNode.position = position

            console.log(newNode)

            switch (currentDragElement.type) {
                case "input":
                    newNode.sourcePosition = Position.Right
                    break;
                case "output":
                    newNode.targetPosition = Position.Left
                    break;
                case "default":
                    newNode.sourcePosition = Position.Right
                    newNode.targetPosition = Position.Left
                    break;
            }

            setElements(elements.concat(newNode));
            setCurrentDragElement(null);
        }
    };

    return (
        <div style={{ display: "flex", position: "relative" }}>
            <div className="reactflow-wrapper" ref={reactFlowWrapper} style={{ height: "75vh", flex: 11 }}>
                <ReactFlow
                    elements={elements}
                    onElementClick={onElementClick}
                    onPaneClick={onReactFlowPannelClick}
                    onConnect={onConnect}
                    onNodeDragStop={onNodeDragStop}
                    onLoad={onLoad}
                    onEdgeUpdate={onEdgeUpdate}
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                    nodeTypes={nodeTypes}
                    snapToGrid={true}
                    key="edges"
                >
                    <MiniMap />
                    <Controls />
                    <Background />
                    {currentSelectElement &&
                        <FloatPanel
                            visiable={showFloatPanel}
                            nodeId={currentSelectElement.id}
                            data={currentSelectElement.data.payload}
                            type={currentSelectElement.data.type}
                            label={currentSelectElement.data.label}
                        ></FloatPanel>
                    }
                </ReactFlow>
            </div>
            <div style={{ flex: 1 }}>
                <SideBar />
            </div>
        </div>
    );
}