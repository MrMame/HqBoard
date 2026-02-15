import { AppView } from "../ModelViews/AppView";
import { BoardView} from    "../ModelViews/BoardView"
import { ToolboxView } from "../ModelViews/ToolboxView";

export class UiDrawer{

    private _elTargetBoard : null| HTMLElement = document.getElementById("board");
    private _elTargetToolbox : null | HTMLElement = document.getElementById("tools");

    public drawCompleteUI(appView:AppView){
        if(this._elTargetBoard===null)throw new Error("No Target Board-Div found to draw board into");
        if(this._elTargetToolbox===null)throw new Error("No Target Toolbox-Div found to draw toolbox into");
        this._drawBoard(appView.boardView,this._elTargetBoard);
        this._drawToolbox(appView.toolboxView,this._elTargetToolbox);
    }


    // ############## PRIVATES ################################
    private _drawBoard(boardView:BoardView,elTargetDiv:HTMLElement){
       elTargetDiv.appendChild(boardView.htmlElement);
    }

    private _drawToolbox(toolboxView:ToolboxView,targetDiv:HTMLElement){
        targetDiv.appendChild(toolboxView.htmlElement);
    }



}