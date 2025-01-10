import {useDroppable} from '@dnd-kit/core';
type DroppableProps = {
    children: React.ReactNode; 
    id: string;
  }
const  Droppable:React.FC<DroppableProps>=(props)=> {
  const {isOver, setNodeRef} = useDroppable({
    id: props.id,
  });
  const style = {
    color: isOver ? 'green' : undefined,
  };
  
  
  return (
    <div ref={setNodeRef} style={style} className='bg-gray-200 h-1/2 w-full'>
      {props.children}
    </div>
  );
}

export default Droppable;