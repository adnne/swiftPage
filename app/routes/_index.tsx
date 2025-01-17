import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { selectNode } from "~/NodeElement/NodeElementSlice";

import  { CanvasNode, NodeTypes } from "~/utils/CanvasNode";
import { constructNode } from "~/utils/elementConstructors";
import { findParentNode, generateRandomId } from "~/utils/functions";


const WebsiteBuilder: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [usedIds, setUsedIds] = useState<string[]>([]);
  const [docMap, setDocMap] = useState<CanvasNode[]>([]);
  const selectedElementRef = useRef<NodeTypes | null>(null);
  const dispatch = useDispatch()

  const onDrag = (
    e: React.DragEvent<HTMLDivElement>,
    elementType: NodeTypes
  ) => {
    e.preventDefault();
    e.stopPropagation();
    selectedElementRef.current = elementType;
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const id = generateRandomId(usedIds);
    setUsedIds([...usedIds, id]);
    let node;
    if (selectedElementRef.current) {
      node = constructNode(selectedElementRef.current, id,undefined,clickCallback);
    }
    
    if (node) {
      if (
        selectedElementRef.current === "container" &&
        (e.target as Element).id === "parent"
      ) {
        setDocMap((prevDocMap) =>
          prevDocMap.length === 0 ? [node] : [...prevDocMap, node]
        );
      } else if ((e.target as Element).id !== "parent") {
        const targetId = (e.target as Element).id;
        const parentNode = findParentNode(targetId, docMap);
        parentNode?.addChild(node);
      }
    }
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const clickCallback = (id:string,type:NodeTypes) =>{
    dispatch(selectNode({id,type}))
  }

  return (
    <div className="flex h-screen bg-gray-100 p-4 gap-2 justify-between">
      <div className="bg-white rounded w-1/5 border border-gray-200 p-2">
        <h3 className="text-center font-bold mb-2">Components</h3>
        <div className="flex flex-col gap-1">
          <div
            className="h-10 text-center bg-blue-500 text-white rounded cursor-pointer"
            draggable
            onDrag={(e) => onDrag(e, "container")}
          >
            Container
          </div>
          <div
            className="h-10 text-center bg-green-500 text-white rounded cursor-pointer"
            draggable
            onDrag={(e) => onDrag(e, "input")}
          >
            Input
          </div>
          <div
            className="h-10 text-center bg-red-500 text-white rounded cursor-pointer"
            draggable
            onDrag={(e) => onDrag(e, "button")}
          >
            Button
          </div>
          <div
            className="h-10 text-center bg-yellow-500 text-white rounded cursor-pointer"
            draggable
            onDrag={(e) => onDrag(e, "heading")}
          >
            Heading
          </div>
        </div>
      </div>

      <div className="bg-white rounded w-full border border-gray-200 p-2">
        <h3 className="text-center font-bold mb-2">Canvas</h3>
        <div
          ref={canvasRef}
          onDrop={onDrop}
          onDragOver={onDragOver}
          id="parent"
          className="min-h-96 border border-gray-200 rounded p-2"
        >
          {docMap.map((node) => node.render())}
        </div>
      </div>

      <div className="bg-white rounded w-1/5 border border-gray-200 p-2">
        <h3 className="text-center font-bold mb-2">Parameters</h3>
        <div className="text-gray-500 text-sm">
          Select an element to edit parameters
        </div>
        {/* {localStorage.getItem("selectedElementType") === "container" && (
          <div className="flex flex-col gap-2 mt-2">
            <label>Height</label>
            <input type="text" />
            <label>split</label>
            <select>
              <option value="1/2">1/2</option>
              <option value="1/3">1/3</option>
              <option value="2/3">2/3</option>
              <option value="1/4">1/4</option>
            </select>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default WebsiteBuilder;
