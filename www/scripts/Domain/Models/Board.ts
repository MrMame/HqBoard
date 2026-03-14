
import { Tile } from "./Tile.js";
import { BoardObject } from "./BoardObject.js"
export class Board{

    public BoardSquareHeight : number  = 19;
    public BoardSquareWidth : number  = 26;
    public tiles                : Tile[][]            = [];
    public selectedObject         : null|BoardObject      = null;
    public description            : string                = "";

    public constructor(){
        for (let x = 0; x < this.BoardSquareWidth; x++) {
            this.tiles[x] = [];     // Twodimensional Array needs to be initialized like this. Otehr dimensions are automatically created by JS.    
            for(let y = 0; y < this.BoardSquareHeight; y++){
                this.tiles[x][y] = new Tile(x,y);
            }
        }
    }


    public SetBoardObjectOnTile(newBoardObject:BoardObject,tilePosX:number,tilePosY:number){
        this.tiles[tilePosX][tilePosY].addBoardObject(newBoardObject);
    }

}   