export class ToolboxItemView{

    private TOOLBOX_ITEM_CLASSNAME : string = "tool-item";


    public id:string;
    public type:string;
    public textlabel:string;
    public htmlElement:HTMLElement;

    constructor(type:string,textlabel:string){
        this.id = `${this.TOOLBOX_ITEM_CLASSNAME}-${type}`;
        this.type=type;
        this.textlabel=textlabel;
        this.htmlElement=this._createHtmlElement(this.id,this.type,this.textlabel);
    }

       // ################### PRIVATES #####################

    private _createHtmlElement(id:string,type:string,textlabel:string):HTMLElement{
        let elToolboxItem :HTMLElement = document.createElement("div");
        elToolboxItem.className = this.TOOLBOX_ITEM_CLASSNAME;
        elToolboxItem.draggable = true;
        elToolboxItem.dataset.id= id;
        elToolboxItem.dataset.type = type;
        elToolboxItem.textContent = textlabel;
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

