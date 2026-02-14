import { GameObjectViewRegistry } from "./GameObjectViewRegistry";
import { Board } from "../../Domain/Models/Board";

export class GameController{

    private _board:Board;
    private _govReg:GameObjectViewRegistry;

    constructor(board:Board, govReg:GameObjectViewRegistry){
        this._board = board;
        this._govReg = govReg;
    }

    public AddBoardObject(objType:string,posX:number,posY:number)
    {

    }

}