import React, { useRef, useState } from "react";
import CanvasNode, { NodeTypes } from "~/utils/CanvasNode";

type DocMap = {
  type:'container'|'heading'|'input'|'button',
  id:string,
  style:React.CSSProperties,
  children:DocMap[]|null,
  content?:string
}


const WebsiteBuilder: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [usedIds, setUsedIds] = useState<string[]>([]);
  const [docMap, setDocMap] = useState<CanvasNode>();
  const [selectedElement, setSelectedElement] = useState<NodeTypes>();

  
  const onDrag = (e: React.DragEvent<HTMLDivElement>,elementType:NodeTypes) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedElement(elementType);
  }

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(selectedElement);
    if (selectedElement=='container') {
      const id = Math.random().toString().substring(7);
      setUsedIds([...usedIds,id]);
      const newNode = new CanvasNode(selectedElement,id,{
        border:'1px dotted black',
        height:'100px',
        display:'flex',
        flexDirection:'column'
      },null);

      
        // If this is the first node, set it as the root
        setDocMap(newNode);
    }
 
  }
  return (
    <div className="flex h-screen bg-gray-100 p-4 gap-2 justify-between">
      <div className="bg-white rounded w-1/5 border border-gray-200 p-2">
        <h3 className="text-center font-bold mb-2">Components</h3>
        <div className="flex flex-col gap-1">
          <div
            className="h-10 text-center bg-blue-500 text-white rounded cursor-pointer"
            draggable
            onDrag={(e) => onDrag(e,'container')}
          >
            Container
          </div>
          <div
            className="h-10 text-center bg-green-500 text-white rounded cursor-pointer"
            draggable
            onDrag={(e) => onDrag(e,'input')}
          >
            Input
          </div>
          <div
            className="h-10 text-center bg-red-500 text-white rounded cursor-pointer"
            draggable
            onDrag={(e) => onDrag(e,'button')}
          >
            Button
          </div>
          <div
            className="h-10 text-center bg-yellow-500 text-white rounded cursor-pointer"
            draggable
            onDrag={(e) => onDrag(e,'heading')}
          >
            Heading
          </div>

        </div>
      </div>

      <div
        className="bg-white rounded w-full border border-gray-200 p-2"
      >
        <h3 className="text-center font-bold mb-2">Canvas</h3>
        <div ref={canvasRef} onDrop={onDrop} onDragOver={(e) => e.preventDefault()} className="h-96 border border-gray-200 rounded p-2">
          {docMap && docMap.render()}
        </div>
      </div>

      <div className="bg-white rounded w-1/5 border border-gray-200 p-2">
        <h3 className="text-center font-bold mb-2">Parameters</h3>
        <div className="text-gray-500 text-sm">Select an element to edit parameters</div>
      </div>
    </div>
  );
};

export default WebsiteBuilder;
