import { createContext } from 'react'
import { Elements, FlowElement, Node } from 'react-flow-renderer'

interface flowElementContext {
    currentDragElement: Node | null,
    setCurrentDragElement: (e: Node | null) => void,
    currentSelectElement: Node | null,
    setCurrentSelectElement: (e: Node | null) => void,
    elements: Array<FlowElement>,
    setElements: (e: Elements<any>) => void
}

export const FlowElementsContext = createContext<flowElementContext>({
    currentDragElement: null,
    setCurrentDragElement: () => { },
    currentSelectElement: null,
    setCurrentSelectElement: () => { },
    elements: [],
    setElements: () => { }
})