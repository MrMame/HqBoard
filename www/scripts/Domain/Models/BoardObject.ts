export class BoardObject{
    public posX : number = -1;
    public posY : number = -1;
    public type : undefined | string = undefined;
    public htmlElement : null |HTMLElement = null

    constructor(type:string,posX:number,posY:number,htmlElement:HTMLElement){
        this.type = type;
        this.posX = posX;
        this.posY = posY;
        this.htmlElement = htmlElement;
    }

}