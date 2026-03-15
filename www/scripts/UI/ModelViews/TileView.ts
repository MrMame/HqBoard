import { Tile } from "../../Domain/Models/Tile.js";

export class TileView{

    private CLASSNAME_CELL_ELEMENT : string = "cell";
    private _tile:Tile;

    public htmlElement:HTMLElement;
    private _col:number;
    private _row:number;

    public constructor(tile:Tile){
        this._tile = tile;
        this._col=tile.posCol;
        this._row=tile.posRow;
        this.htmlElement = this._createHtmlElement();
    }

    public getPosCol():number{
        return this._col;
    }
    public getPosRow():number{
        return this._row;
    }

    // ################# PRIVATES ################
    private _createHtmlElement():HTMLElement{
        const htmlElement = document.createElement("div");
        htmlElement.classList.add(this.CLASSNAME_CELL_ELEMENT);
        htmlElement.dataset.x = String(this._col);
        htmlElement.dataset.y = String(this._row);
        return htmlElement;
    }


}