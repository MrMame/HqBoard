import { BoardObject } from "./BoardObject";

export class Tile{
    public posCol:number;
    public posRow:number
    public BoardObjectsOnTile:BoardObject[] = [];

    constructor(posCol:number,posRow:number){
        this.posCol = posCol;
        this.posRow = posRow;
    }

    public addBoardObject(newBoardObject:BoardObject){
        newBoardObject.standsOnTile = this;
        this.BoardObjectsOnTile.push(newBoardObject);
    };
}