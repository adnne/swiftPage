import CanvasNode, { NodeTypes } from "./CanvasNode";

const constructContainer = (elementType: NodeTypes, id: string): CanvasNode => {
  const node = new CanvasNode(
    elementType,
    id,
    {
      border: "1px dotted black",
      minHeight: "100px",
      display: "flex",
      flexDirection: "column",
      padding: "0.5rem",
      margin: "0.5rem",
      cursor: "grab",
    },
    null
  );

  return node;
};

const constructInput = (elementType: NodeTypes, id: string): CanvasNode => {
  const node = new CanvasNode(
    elementType,
    id,
    {
      height: "30px",
      border: "1px solid black",
    },
    null
  );

  return node;
};

const constructButton = (elementType: NodeTypes, id: string): CanvasNode => {
  const node = new CanvasNode(
    elementType,
    id,
    {
      height: "30px",
      backgroundColor: "blue",
    },
    null,
    'click'
  );

  return node;
};

const constructHeading = (elementType: NodeTypes, id: string): CanvasNode => {
  const node = new CanvasNode(
    elementType,
    id,
    {
      height: "30px",
      width: "200px",
    },
    null,
    "Heading"
  );

  return node;
};

export const constructNode = (
  elementType: NodeTypes,
  id: string
): CanvasNode|undefined => {
  let node;
  if (elementType == "container") {
    node = constructContainer(elementType, id);
  }
  if (elementType == "input") {
    node = constructInput(elementType, id);
  }
  if (elementType == "button") {
    node = constructButton(elementType, id);
  }
  if (elementType == "heading") {
    node = constructHeading(elementType, id);
  }
  if (node) {
    return node;
  }
  return undefined;
};


