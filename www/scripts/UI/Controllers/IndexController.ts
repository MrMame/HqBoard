import { BoardStorageService } from "../../Application/Services/BoardStorageService.js";
import { UiDrawer } from "../Drawers/UiDrawer.js";
import { AppViewFactory } from "../Factories/AppViewFactory.js";
import { BoardViewFactory } from "../Factories/BoardViewFactory.js";
import { AppView } from "../ModelViews/AppView.js";
import { BoardView } from "../ModelViews/BoardView.js";
import { TileView } from "../ModelViews/TileView.js";


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

    public getTileViewFromBoardView(x: number, y: number): TileView | null {
        if (this._appView.boardView && this._appView.boardView.tiles[x] && this._appView.boardView.tiles[x][y]) {
            return this._appView.boardView.tiles[x][y];
        }
        return null;
    }

    public dropToolboxObjectOnBoard(boardXTarget: number, boardYTarget: number, draggedElement: HTMLElement){
        // Finde das TileView unter der Maus
        let targetTileView: TileView | null = null;
        const elementUnderMouse: any = document.elementFromPoint(boardXTarget, boardYTarget);
        if (elementUnderMouse && elementUnderMouse.classList.contains('cell')) {
            const tileX = parseInt(elementUnderMouse.dataset.x || '0');
            const tileY = parseInt(elementUnderMouse.dataset.y || '0');
            if (this._appView.boardView && this._appView.boardView.tiles[tileX] && this._appView.boardView.tiles[tileX][tileY]) {
                targetTileView = this._appView.boardView.tiles[tileX][tileY];
            }
        }
        // TargetTileview was found, now we can add the dragged object to the tile and update the board view accordingly. For now, we will just log the event.
        if(targetTileView){
            // TODO: Add the dragged object to the tile's board object list and update the board view accordingly. This will require some changes to the Board, Tile, BoardObject and BoardView classes to properly handle the new board objects and their visual representation on the board.
            console.log(`Toolbox Object dropped on board at tile ${targetTileView.x}, ${targetTileView.y}`, draggedElement);
        }
    }



}