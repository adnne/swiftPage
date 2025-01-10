import React, { useState } from "react";

import { DndContext, DragEndEvent, DragOverEvent, KeyboardSensor, MouseSensor, TouchSensor, UniqueIdentifier,useSensor, useSensors } from "@dnd-kit/core";
import Droppable from "~/components/Droppable";
import Draggable from "~/components/Draggable";

const WebsiteBuilder: React.FC = () => {
  const [parent, setParent] = useState<UniqueIdentifier | null>(null);

  const components = [
    {
      id: "1",
      type: "header",
      props: {
        text: "header",
      },
    },
    {
      id: "2",
      type: "footer",
      props: {
        text: "hello this is the footer",
      },
    },
  ];

  const [canvasComponents, setCanvasComponents] = useState([
   
  ]);

  
  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor);
  const keyboardSensor = useSensor(KeyboardSensor);
  
  const sensors = useSensors(
    mouseSensor,
    touchSensor,
    keyboardSensor,
  );


  function handleDragEnd(event: DragEndEvent) {
    console.log('end');
    
  }
  const handleDragOver = (event: DragOverEvent) => {
    
    if (event?.over?.id === 'canvas') {
      console.log(event);
      console.log('over');
      if (event.active.id === '1') {
        const newComponent = [{
          id: Math.floor(Math.random()).toString(),
          type: 'header',
          props: {
            text: 'header',
          },
        }];
        console.log(newComponent);
        console.log(canvasComponents);
        
        
        setCanvasComponents([...canvasComponents, ...newComponent]);
      }
      if (event.active.id === '2') {
        const newComponent = [{
          id: Math.floor(Math.random()).toString(),
          type: 'footer',
          props: {
            text: 'hello this is the footer',
          },
        }];
        setCanvasComponents([...canvasComponents, ...newComponent]);
      }


      
    }
    
  }

  return (
    <DndContext onDragEnd={handleDragEnd} onDragOver={handleDragOver}   >
      <div className="flex h-screen bg-gray-100 p-4 gap-2 justify-between">
        <div className="bg-white  rounded w-1/5 border border-gray-200">
          components
          <div className="p-2 flex flex-col gap-2">
            {components.map((component, index) => (
              <Draggable id={component.id} key={index}>
                <div className="bg-white rounded w-full border border-gray-200 p-1 ">
                  {component.props.text}
                </div>
              </Draggable>
            ))}
          </div>
        </div>
        <div className="bg-white rounded w-full border  border-gray-200">
          canvas
          <Droppable id="canvas">

          {canvasComponents.map((component, index) => (
              <Draggable id={component.id.toString()} key={index}>
                <div className="bg-white rounded w-full border border-gray-200 p-1 ">
                  {component.props.text}
                </div>
              </Draggable>
          ))}
            
          </Droppable>
        </div>
        <div className="bg-white rounded w-1/5 border border-gray-200">
          parameters
        </div>
      </div>
    </DndContext>
  );
};

export default WebsiteBuilder;
