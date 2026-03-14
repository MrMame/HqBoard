import { Tile } from "./Tile";

export class BoardObject{
    public type : undefined | string = undefined;
    public standsOnTile : Tile | null = null;


    constructor(type:string,targetTile:Tile | null){
        this.type = type;
    }



}