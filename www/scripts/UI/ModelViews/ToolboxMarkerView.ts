export class ToolboxMarkerView{
        
    private TOOLBOX_MARKER_CLASSNAME : string = "tool-item marker-tool";

    public id:string;
    public type:string;
    public letter:string;
    public htmlElement:HTMLElement;

    constructor(type:string,letter:string){
        this.id = `${this.TOOLBOX_MARKER_CLASSNAME}-${type}`;
        this.type=type;
        this.letter=letter;
        this.htmlElement=this._createHtmlElement(this.id,this.type,this.letter);
    }


    // ################### PRIVATES #####################
    private _createHtmlElement(id:string,type:string,letter:string):HTMLElement{
        let elToolboxItem :HTMLElement = document.createElement("div");
        elToolboxItem.className = this.TOOLBOX_MARKER_CLASSNAME;
        elToolboxItem.draggable = true;
        elToolboxItem.dataset.id= id;
        elToolboxItem.dataset.type = type;
        elToolboxItem.dataset.letter = letter;
        elToolboxItem.textContent = letter;
        elToolboxItem.addEventListener("dragstart", this._onToolboxItemDragstartEventHandler);
        return elToolboxItem;
    }   
    // ################# EVENTHANDLER ###############################
    private _onToolboxItemDragstartEventHandler = (event:any)=>{
        if(event===null)throw new Error("No valid Event Parameter during dragStart Event");
        if(event.dataTransfer===null)throw new Error("No valid Event.dataTarnsfer Parameter during dragStart Event");
        event.dataTransfer.setData("text/plain", event.target.dataset.id);
    }


}