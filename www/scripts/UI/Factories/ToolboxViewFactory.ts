import { ToolboxView } from "../ModelViews/ToolboxView.js";
import { ToolboxItemViewFactory} from "../Factories/ToolboxItemViewFactory.js";
import { ToolboxItemView } from "../ModelViews/ToolboxItemView.js";
import { ToolboxMarkerView } from "../ModelViews/ToolboxMarkerView.js";
import { ToolboxMarkerViewFactory } from "../Factories/ToolboxMarkerViewFactory.js";

export class ToolboxViewFactory{
    public static createToolboxView(){
        // Create Toolbox Figures
        let toolboxItems:ToolboxItemView[] =[];
        toolboxItems.push(ToolboxItemViewFactory.createToolboxSofa());
        toolboxItems.push(ToolboxItemViewFactory.createToolboxDesk());
        // Create Toolbox Markers
        let tbMarkers : ToolboxMarkerView[] = this._createMarkers();
        // Create finished Toolbox
        let toolboxView:ToolboxView = new ToolboxView("Tools",toolboxItems,tbMarkers);
        return toolboxView;
    }

    private static _createMarkers():ToolboxMarkerView[]{
        let toolboxMarkers:ToolboxMarkerView[]=[];
        // Create Markers with Letter A-Z
        for (let i = 65; i <= 90; i++) {
            let letter:string = String.fromCharCode(i);
            toolboxMarkers.push(ToolboxMarkerViewFactory.createToolboxMarkerView(letter));
        }
        return toolboxMarkers;
    }


}