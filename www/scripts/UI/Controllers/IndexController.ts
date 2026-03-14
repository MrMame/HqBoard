import { BoardStorageService } from "../../Application/Services/BoardStorageService.js";
import { UiDrawer } from "../Drawers/UiDrawer.js";
import { AppViewFactory } from "../Factories/AppViewFactory.js";
import { BoardViewFactory } from "../Factories/BoardViewFactory.js";
import { AppView } from "../ModelViews/AppView.js";
import { BoardView } from "../ModelViews/BoardView.js";


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
        // Lese Objekte aus File aus
        this._boardStorageService.loadBoardFromFile(file).then(board => {
            let boardView = BoardViewFactory.createBoardViewFromBoard(board);
            this._appView.boardView = boardView;
            this._uiDrawer.drawCompleteUI(this._appView);
        });
    }
    public saveBoard(){
        let boardView :BoardView= this._appView.boardView;
        this._boardStorageService.saveBoardAsJSON(boardView.getBoard(), "hq_board.json");
    }





}