import { BoardView } from "./BoardView.js";
import { ToolboxView } from "./ToolboxView.js";

export class AppView{
    public toolboxView:ToolboxView;
    public boardView: BoardView;

    constructor(toolboxView:ToolboxView,boardView:BoardView){
        this.toolboxView = toolboxView;
        this.boardView = boardView;
    }
}