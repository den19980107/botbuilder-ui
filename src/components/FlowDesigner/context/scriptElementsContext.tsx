import { createContext } from 'react'
import { Elements, FlowElement, Node } from 'react-flow-renderer'

interface scriptElementContext {
    currentDragElement: Node | null,
    setCurrentDragElement: React.Dispatch<React.SetStateAction<Node | null>>,
    currentSelectElement: Node | null,
    setCurrentSelectElement: React.Dispatch<React.SetStateAction<Node | null>>,
    elements: Array<FlowElement>,
    setElements: React.Dispatch<React.SetStateAction<Elements<any>>>
}

export const ScriptElementsContext = createContext<scriptElementContext>({
    currentDragElement: null,
    setCurrentDragElement: () => { },
    currentSelectElement: null,
    setCurrentSelectElement: () => { },
    elements: [],
    setElements: () => { }
})