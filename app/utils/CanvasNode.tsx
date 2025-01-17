import React, { Component } from 'react';

export type NodeTypes = "container" | "heading" | "input" | "button";

export interface CanvasNodeProps {
  type: NodeTypes;
  id: string;
  style: React.CSSProperties;
  children?: CanvasNode[];
  content?: string;
}
  
export class CanvasNode extends Component<CanvasNodeProps> {
  public children: CanvasNode[] | null = null;

  constructor(props: CanvasNodeProps) {
    super(props);
    this.children = props.children || null;
    this.onClick = this.onClick.bind(this);
  }

  addChild(child: CanvasNode) {
    if (this.children) {
      this.children.push(child);
    } else {
      this.children = [child];
    }
  }

  findNode(id: string): CanvasNode | undefined {
    if (this.props.id === id) {
      return this;
    } else if (this.children) {
      for (const child of this.children) {
        const node = child.findNode(id);
        if (node) {
          return node;
        }
      }
    }
    return undefined;
  }

  getParent(id: string): CanvasNode | undefined {
    if (this.children) {
      for (const child of this.children) {
        if (child.props.id === id) {
          return this;
        }
        const node = child.getParent(id);
        if (node) {
          return node;
        }
      }
    }
    return undefined;
  }

  onClick(e: React.MouseEvent) {
    e.stopPropagation();
    const { id, type } = this.props;
    
    const previouslySelectedElement = document.querySelector('.selectedEl') as HTMLElement;
    const selectedElement = document.getElementById(id);

    if (previouslySelectedElement) {
      previouslySelectedElement.className = '';
      previouslySelectedElement.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
      previouslySelectedElement.style.border = '1px dotted black';
      previouslySelectedElement.style.transform = 'scale(1)';
      previouslySelectedElement.style.position = 'relative';
      previouslySelectedElement.style.outline = 'none';
    }

    if (selectedElement) {
      selectedElement.className = 'selectedEl';
      selectedElement.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
      selectedElement.style.border = '2px solid #22c55e';
      selectedElement.style.transform = 'scale(1.02)';
      selectedElement.style.position = 'relative';
      selectedElement.style.outline = 'none';
    }
  }

  renderContent() {
    const { type, id, style, content, children } = this.props;

    switch (type) {
      case 'container':
        return (
          <div key={id} style={style} id={id} onClick={this.onClick}>
            {children?.map((child: any) => child.render())}
          </div>
        );

      case 'heading':
        return (
          <h1 key={id} style={style} id={id} onClick={this.onClick}>
            {content}
          </h1>
        );

      case 'input':
        return (
          <input key={id} style={style} id={id} onClick={this.onClick} />
        );

      case 'button':
        return (
          <button key={id} style={style} id={id} onClick={this.onClick}>
            {content}
          </button>
        );

      default:
        return null;
    }
  }

  render() {
    return this.renderContent();
  }
}


