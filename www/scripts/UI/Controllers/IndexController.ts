import { BoardStorageService } from "../../Application/Services/BoardStorageService.js";
import { Board } from "../../Domain/Models/Board.js";
import { UiDrawer } from "../Drawers/UiDrawer.js";
import { PageFactory } from "../Factories/PageFactory.js";


export class IndexController{

    private _boardStorageService:BoardStorageService;

    private _board : Board = new Board();
    private _uiDrawer : UiDrawer = new UiDrawer();

    

    public constructor(boardStorageService:BoardStorageService){
        this._boardStorageService = boardStorageService;
    }

    public initUI(){
         this._uiDrawer.drawCompleteUI(this._board);
    }

    public async loadBoardFile(file:File){
        this._board = await this._boardStorageService.loadBoardFromFile(file);
        this._uiDrawer.drawCompleteUI(this._board);
    }
    public saveBoard(){
        if(this._board===null)return;
        this._boardStorageService.saveBoardAsJSON(this._board,"heroquest_level.xml")
    }





}