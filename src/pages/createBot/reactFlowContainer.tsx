import React, { useContext, useRef, useState } from 'react'
import ReactFlow, { addEdge, ArrowHeadType, Background, Connection, Controls, Edge, Elements, FlowElement, MiniMap, Node, OnLoadParams, Position, removeElements } from 'react-flow-renderer';
import { FloatPanel } from './floatPanel';
import { FlowElementsContext } from './flowElementsContext';
import { SideBar } from './sideBar'
import { createEdgeId } from './util/createId';

// import custom node
import { ConditionNode } from './customNodes/conditionNode'

const nodeTypes = {
    condition: ConditionNode,
};

interface ReactFlowContainerProps {

}

export const ReactFlowContainer: React.FC<ReactFlowContainerProps> = ({ }) => {
    const { elements, setElements, currentDragElement, setCurrentDragElement, currentSelectElement, setCurrentSelectElement } = useContext(FlowElementsContext)
    const [showFloatPanel, setShowFloatPanel] = useState<boolean>(false);
    const reactFlowWrapper = useRef<HTMLDivElement>(null);
    const [reactFlowInstance, setReactFlowInstance] = useState<OnLoadParams | null>(null);

    const onLoad = (_reactFlowInstance: OnLoadParams) => {
        setReactFlowInstance(_reactFlowInstance);
    }
    const onElementsRemove = (elementsToRemove) => {
        // const setElements: (value: React.SetStateAction<Elements<any>>) => void
        setElements(removeElements(elementsToRemove, elements));
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

    const onNodeDragStop = (event, node) => console.log('drag stop', node);
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
                    onElementsRemove={onElementsRemove}
                    onConnect={onConnect}
                    onNodeDragStop={onNodeDragStop}
                    onLoad={onLoad}
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
                        <FloatPanel visiable={showFloatPanel} nodeId={currentSelectElement.id} data={currentSelectElement.data.payload} type={currentSelectElement.data.type}></FloatPanel>
                    }
                </ReactFlow>
            </div>
            <div style={{ flex: 1 }}>
                <SideBar />
            </div>
        </div>
    );
}