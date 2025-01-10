import {useDraggable} from '@dnd-kit/core';

type DraggableProps = {
  children: React.ReactNode;
  id: string;
}
const Draggable :React.FC<DraggableProps> = (props) =>{
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: props.id,
  });
  
  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  
  return (
    <button className='w-full' ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {props.children}
    </button>
  );
}

export default Draggable;