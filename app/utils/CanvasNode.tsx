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
                <div key={this.id} style={this.style} className="container">
                    {this.children?.map((child: any) => child.render())}
                </div>
            );
        }

        if (this.type === "heading") {
            return (
                <h1 key={this.id} style={this.style} className="item">
                    {this.content}
                </h1>
            );
        }

        if (this.type === "input") {
            return (
                <input key={this.id} style={this.style} className="item" />
            );
        }

        if (this.type === "button") {
            return (
                <button key={this.id} style={this.style} className="item">
                    {this.content}
                </button>
            );
        }

    }

}

export type NodeTypes ='container'|'heading'|'input'|'button';

export default CanvasNode ;