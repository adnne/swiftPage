import React, { useRef, useState } from "react";
import CanvasNode, { NodeTypes } from "~/utils/CanvasNode";

type DocMap = {
  type: "container" | "heading" | "input" | "button";
  id: string;
  style: React.CSSProperties;
  children: DocMap[] | null;
  content?: string;
};

const WebsiteBuilder: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [usedIds, setUsedIds] = useState<string[]>([]);
  const [docMap, setDocMap] = useState<CanvasNode[]>([]);
  const selectedElementRef = useRef<NodeTypes | null>(null);

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
    const id = Math.random().toString().substring(7);
    setUsedIds([...usedIds, id]);
    let node;
    if (selectedElementRef.current == "container") {
      node = new CanvasNode(
        selectedElementRef.current,
        id,
        {
          border: "1px dotted black",
          minHeight: "100px",
          display: "flex",
          flexDirection: "column",
          padding:'0.5rem',
          margin:'0.5rem',
        },
        null
      );
    }
    if (selectedElementRef.current == "input") {
      node = new CanvasNode(
        selectedElementRef.current,
        id,
        {
          height: "30px",
          border: "1px solid black",
        },
        null
      );
    }
    if (selectedElementRef.current == "button") {
      node = new CanvasNode(
        selectedElementRef.current,
        id,
        {
          height: "30px",
          backgroundColor: "blue",
        },
        null,
        "Button"
      );
    }
    if (selectedElementRef.current == "heading") {
      node = new CanvasNode(
        selectedElementRef.current,
        id,
        {
          height: "30px",
          width: "200px",
        },
        null,
        "Heading"
      );
    }
    if (node) {
      if (selectedElementRef.current === "container" && (e.target as Element).id === "parent") {
        setDocMap((prevDocMap) => (prevDocMap.length === 0 ? [node] : [...prevDocMap, node]));
      } else if ((e.target as Element).id !== "parent") {
        const targetId = (e.target as Element).id;
        const parentNode = findParentNode(targetId, docMap);
        parentNode?.addchild(node);
      }
    }
    
  };

  const findParentNode = (id: string, nodes: CanvasNode[]): CanvasNode | undefined => {
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

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
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
          {docMap && docMap.map((node) => node.render())}
        </div>
      </div>

      <div className="bg-white rounded w-1/5 border border-gray-200 p-2">
        <h3 className="text-center font-bold mb-2">Parameters</h3>
        <div className="text-gray-500 text-sm">
          Select an element to edit parameters
        </div>
      </div>
    </div>
  );
};

export default WebsiteBuilder;
