import { Board } from "../../Domain/Models/Board.js";
import { TileViewFactory } from "../Factories/TileViewFactory.js";
import { TileView } from "./TileView.js";

export class BoardView{

    public static BOARD_SQUARE_HEIGHT:number = 19;
    public static BOARD_SQUARE_WIDTH:number = 26;

    public tileViews:TileView[][];

    
    public htmlElement : HTMLElement;
    private _board:Board;


    constructor(board:Board){
        this._board = board;
        this.tileViews = TileViewFactory.createTileViewsFromBoard(board);
        this.htmlElement = this._createHtmlElement();
    }

    public getBoard(){
        return this._board;
    };

     private _createHtmlElement():HTMLElement{
        let elGrid:HTMLElement= document.createElement("div")
        elGrid.id = "grid";
        this.tileViews.forEach(row => {
            row.forEach(tileView => {
                console.log(`Creating HTML element for tile at position ${tileView.getPosCol()}, ${tileView.getPosRow()}`);
                elGrid.appendChild(tileView.htmlElement);
            });
        });
        return elGrid;
    }
}