
import { Tile } from "./Tile.js";
import { BoardObject } from "./BoardObject.js"
export class Board{

    public BOARD_TILES_ROWS         : number  = 19;
    public BOARD_TILES_COLUMNS      : number  = 26;
    public selectedObject           : null|BoardObject      = null;
    public description              : string                = "";
    
    private _tiles                   : Tile[][]            = [];
    
    public constructor(){
        for (let row = 0; row < this.BOARD_TILES_ROWS; row++) {
            this._tiles[row] = [];     // Twodimensional Array needs to be initialized like this. Otehr dimensions are automatically created by JS.    
            for(let col = 0; col < this.BOARD_TILES_COLUMNS; col++){
                this._tiles[row][col] = new Tile(col,row);
            }
        }
    }


    public getTileAt(col:number,row:number): Tile | null{
        if(this._tiles[row] && this._tiles[row][col]){
            return this._tiles[row][col];
        }
        return null;
    }


    public SetBoardObjectOnTile(newBoardObject:BoardObject,tilePosX:number,tilePosY:number){
        this._tiles[tilePosX][tilePosY].addBoardObject(newBoardObject);
    }

}   