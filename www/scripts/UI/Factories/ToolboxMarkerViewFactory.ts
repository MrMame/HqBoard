import { ToolboxMarkerView } from "./../ModelViews/ToolboxMarkerView.js";

export class ToolboxMarkerViewFactory{

    private static TOOLBOX_MARKER_TYPE = "marker";

    public static createToolboxMarkerView(letter:string):ToolboxMarkerView{
        return new ToolboxMarkerView(this.TOOLBOX_MARKER_TYPE,letter);
    }
}