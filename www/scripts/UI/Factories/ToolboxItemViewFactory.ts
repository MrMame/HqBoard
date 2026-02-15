import { ToolboxItemView as ToolboxItemView } from "../ModelViews/ToolboxItemView.js";
export class ToolboxItemViewFactory{
    

    public static createToolboxSofa():ToolboxItemView{
        let type        : string        = `sofa`;
        let textlabel   : string        = "Sofa (2x1)";
        return new ToolboxItemView(type,textlabel);
    }
    public static createToolboxDesk():ToolboxItemView{
        let type        : string        = `desk`;
        let textlabel   : string        = "Tisch";
        return new ToolboxItemView(type,textlabel);
    }

 

}