import  { CanvasNode, NodeTypes  } from "./CanvasNode";

type styles = {
  [key in NodeTypes]: React.CSSProperties;
};
const STYLES: styles = {
  container: {
    border: "1px dotted black",
    minHeight: "100px",
    display: "flex",
    flexDirection: "column",
    padding: "0.5rem",
    margin: "0.5rem",
    cursor: "grab",
  },
  input: { height: "30px", border: "1px solid black" },
  button: { height: "30px", backgroundColor: "blue" },
  heading: { height: "30px", width: "200px" },
};

export const constructNode = (
  elementType: NodeTypes,
  id: string,
  content?: string,
  callback
): any  => {
  const style = STYLES[elementType];
  
  const node = new CanvasNode({
    id,
    type: elementType,
    style,
    children: [],
    content: content,
    clickCallback:callback
  })
  return node;
};
