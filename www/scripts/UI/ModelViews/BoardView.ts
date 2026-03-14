import { Board } from "../../Domain/Models/Board.js";
import { TileViewFactory } from "../Factories/TileViewFactory.js";
import { TileView } from "./TileView.js";

export class BoardView{

    public static BOARD_SQUARE_HEIGHT:number = 19;
    public static BOARD_SQUARE_WIDTH:number = 26;

    private tiles:TileView[][];

    
    public htmlElement : HTMLElement;
    private _board:Board;


    constructor(board:Board){
        this._board = board;
        this.tiles = TileViewFactory.createTileViewsFromTiles(board.tiles);
        this.htmlElement = this._createHtmlElement();
    }

    public getBoard(){
        return this._board;
    };

     private _createHtmlElement():HTMLElement{
        let elGrid:HTMLElement= document.createElement("div")
        elGrid.id = "grid";
        for (let y = 0; y < BoardView.BOARD_SQUARE_HEIGHT; y++) {
            for (let x = 0; x < BoardView.BOARD_SQUARE_WIDTH; x++) {
                let elTile:HTMLElement = this.tiles[x][y].htmlElement;
                elGrid.appendChild(elTile);
            }
        }
        return elGrid;
    }
}