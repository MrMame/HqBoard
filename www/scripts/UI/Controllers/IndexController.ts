import { BoardStorageService } from "../../Application/Services/BoardStorageService.js";
import { UiDrawer } from "../Drawers/UiDrawer.js";
import { AppViewFactory } from "../Factories/AppViewFactory.js";
import { AppView } from "../ModelViews/AppView.js";


export class IndexController{

    private _boardStorageService:BoardStorageService;

    private _appView : AppView;
    private _uiDrawer : UiDrawer = new UiDrawer();

    



    public constructor(boardStorageService:BoardStorageService){
        this._boardStorageService = boardStorageService;
        this._appView = AppViewFactory.createAppView();        
    }

    public initUI(){
         this._uiDrawer.drawCompleteUI(this._appView);
    }

    public async loadBoardFile(file:File){
        throw new Error("Not Implemented");
    }
    public saveBoard(){
        throw new Error("Not Implemented");
    }





}