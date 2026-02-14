
import { Square } from "./Square.js";
import { BoardObject } from "./BoardObject.js"
export class Board{

    public BoardSquareHeight : number  = 19;
    public BoardSquareWidth : number  = 26;
    public squares                : Square[][]            = [];
    public selectedObject         : null|BoardObject      = null;
    public boardObjects           : BoardObject[]         = [];
    public description            : string                = "";

    public AddNewBoardObject(newBoardObject:BoardObject){
        this.boardObjects.push(newBoardObject);
    }

}   