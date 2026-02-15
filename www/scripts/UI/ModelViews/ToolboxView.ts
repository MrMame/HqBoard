import { ToolboxItemView } from "./ToolboxItemView.js";
import { ToolboxMarkerView } from "./ToolboxMarkerView.js"

export class ToolboxView{
  
    public toolboxHeader:string;
    public toolboxItemViews:ToolboxItemView[];
    public toolboxMarkerViews : ToolboxMarkerView[];
    public htmlElement:HTMLElement;

    constructor(toolboxHeader:string,toolboxItemViews:ToolboxItemView[],tbMarkers : ToolboxMarkerView[]){
        this.toolboxHeader=toolboxHeader;
        this.toolboxItemViews = toolboxItemViews;
        this.toolboxMarkerViews = tbMarkers;
        this.htmlElement = this._createHtmlElement();
    }

    private  _createHtmlElement():HTMLElement{
        let elParentDiv:HTMLElement = document.createElement("div");
        // HEADER
        let elHeader = document.createElement("h1");
        elHeader.innerText = this.toolboxHeader;
        elParentDiv.appendChild(elHeader);
        // TOOLBOX-ITEMS
        this.toolboxItemViews.forEach(tbitemView => {
            elParentDiv.appendChild(tbitemView.htmlElement);
        });
         // HR
        elParentDiv.appendChild(document.createElement("hr"));
        // MARKER HEADER
        let elMarkerHeader : HTMLElement = document.createElement("h4");
        elMarkerHeader.innerText = "Marker";
        elParentDiv.appendChild(elMarkerHeader);
        // MarkerItems
        this.toolboxMarkerViews.forEach(tbmView => {
            elParentDiv.appendChild(tbmView.htmlElement);
        });
        return elParentDiv;
    }

}