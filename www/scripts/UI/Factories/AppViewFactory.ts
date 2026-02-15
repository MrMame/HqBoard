import { AppView } from "../ModelViews/AppView.js";
import { BoardView } from "../ModelViews/BoardView.js";
import { BoardViewFactory } from "./BoardViewFactory.js";
import { ToolboxView } from "./../ModelViews/ToolboxView.js";
import { ToolboxViewFactory } from "./ToolboxViewFactory.js";

export class AppViewFactory{
    public static createAppView():AppView{
        let toolboxView:ToolboxView = ToolboxViewFactory.createToolboxView();
        let boardView:BoardView = BoardViewFactory.createBoardView();
        let appView : AppView = new AppView(toolboxView,boardView);
        return appView;
    }
}