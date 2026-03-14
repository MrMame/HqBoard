import { BoardObject } from "./BoardObject";

export class Tile{
    public posX:number;
    public posY:number
    BoardObjectsOnTile:BoardObject[] = [];

    constructor(posX:number,posY:number){
        this.posX = posX;
        this.posY = posY;
    }

    public addBoardObject(newBoardObject:BoardObject){
        newBoardObject.standsOnTile = this;
        this.BoardObjectsOnTile.push(newBoardObject);
    };
}