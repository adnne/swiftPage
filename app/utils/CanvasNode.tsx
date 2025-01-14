import { createContext } from "react";

class CanvasNode {
    type:NodeTypes;
    id:string;
    style:React.CSSProperties;
    children:CanvasNode[]|null;
    content?:string;
    
    constructor(type:NodeTypes, id:string, style:React.CSSProperties, children:CanvasNode[]|null,content?:string) {
        this.type = type;
        this.id = id;
        this.style = style;
        this.children = children;
        this.content = content;
    }

    render() {
        if (this.type === "container") {
            return (
                <div key={this.id} style={this.style} id={this.id} onClick={(e)=>this.onClick(e)} >
                    {this.children?.map((child: any) => child.render())}
                </div>
            );
        }

        if (this.type === "heading") {
            return (
                <h1 key={this.id} style={this.style} id={this.id} onClick={(e)=>this.onClick(e)} >
                    {this.content}
                </h1>
            );
        }

        if (this.type === "input") {
            return (
                <input key={this.id} style={this.style} id={this.id} onClick={(e)=>this.onClick(e)} />
            );
        }

        if (this.type === "button") {
            return (
                <button key={this.id} style={this.style} id={this.id} onClick={(e)=>this.onClick(e)}>
                    {this.content}
                </button>
            );
        }

    }
    addchild(child:CanvasNode){
        if (this.children) {
            this.children.push(child);
        }else{
            this.children = [child];
        }
    }

    findNode(id:string):CanvasNode|undefined{
        
        if (this.id === id) {
            return this;
        }
        else if (this.children) {
            for (let i = 0; i < this.children.length; i++) {
                const node = this.children[i].findNode(id);
                if (node) {
                    return node;
                }
            }
        }
        return undefined;
    }

    getParent(id:string):CanvasNode|undefined{
        if (this.children) {
            for (let i = 0; i < this.children.length; i++) {
                if (this.children[i].id === id) {
                    return this;
                }
                const node = this.children[i].getParent(id);
                if (node) {
                    return node;
                }
            }
        }
        return undefined;
    }

    onClick(e:React.MouseEvent){
        e.stopPropagation();

        const previouslySelectedElement = document.querySelector('.selectedEl') as HTMLElement;
        const selectedElement = document.getElementById(this.id) ;
        if (previouslySelectedElement) {
            previouslySelectedElement.className = ""; 
            previouslySelectedElement.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            previouslySelectedElement.style.border = '1px dotted black';
            previouslySelectedElement.style.transform = 'scale(1)';
            previouslySelectedElement.style.position = 'relative'; 
            previouslySelectedElement.style.outline = 'none';
        }
        
        if (selectedElement) {
            selectedElement.className = "selectedEl"; 
            selectedElement.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            selectedElement.style.border = '2px solid #22c55e';
            selectedElement.style.transform = 'scale(1.02)'; 
            selectedElement.style.position = 'relative'; 
            selectedElement.style.outline = 'none';
        }
        
    }
   
}

export type NodeTypes ='container'|'heading'|'input'|'button';

export default CanvasNode ;