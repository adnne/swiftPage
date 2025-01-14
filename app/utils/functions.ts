import CanvasNode from "./CanvasNode";
import { v4 as uuidv4 } from 'uuid';

export  const findParentNode = (id: string, nodes: CanvasNode[]): CanvasNode | undefined => {
    for (const node of nodes) {
      if (node.id === id) {
        return node;
      }
      if (node.children) {
        const found = findParentNode(id, node.children);
        if (found) {
          return found;
        }
      }
    }
    return undefined;
  };


  export const generateRandomId = (usedIds: string[]): string => {
    
    let id = uuidv4();
    while (usedIds.includes(id)) {
        id = uuidv4();
    }
    return id;
    }