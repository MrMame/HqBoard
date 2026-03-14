import { Tile } from "../../Domain/Models/Tile.js";

export class TileView{

    private CLASSNAME_CELL_ELEMENT : string = "cell";

    public htmlElement:HTMLElement;
    public x:number;
    public y:number;

    // public constructor(x:number,y:number){
    //     this.x=x;
    //     this.y=y;
    //     this.htmlElement = this._createHtmlElement();
    // }
    public constructor(tile:Tile){
        this.x=tile.posX;
        this.y=tile.posY;
        this.htmlElement = this._createHtmlElement();
    }

    // ################# PRIVATES ################
    private _createHtmlElement():HTMLElement{
        const htmlElement = document.createElement("div");
        htmlElement.classList.add(this.CLASSNAME_CELL_ELEMENT);
        htmlElement.dataset.x = String(this.x);
        htmlElement.dataset.y = String(this.y);

        // htmlElement.addEventListener("dragover", this._onCellDragoverEventHandler);
        // htmlElement.addEventListener("drop", this._onCellDroppedEventHandler);
        return htmlElement;

    }

    // private _onCellDragoverEventHandler = (e:Event)=>{
    //     e.preventDefault();
    // }
    // private _onCellDroppedEventHandler = (event:any)=>{
    //     event.preventDefault();
    //     const dataTransfer : DataTransfer = event as DataTransfer;
    //     console.log(dataTransfer);
    //     const id = event.dataTransfer.getData("text/plain");
    //     const draggedElement = document.querySelector(`[data-id="${id}"]`);
    //     console.log(draggedElement);
    // }


}