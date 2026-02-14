import { Board } from "../../Domain/Models/Board";
import { BoardObject } from "../../Domain/Models/BoardObject";

export class UiDrawer{

    private _elBoardDiv : null| HTMLElement = document.getElementById("board");


    public drawBoard(board:Board){
        if(this._elBoardDiv===null)throw new Error("No Target Board-Div found to draw board into");

        /* GRID ERZEUGEN */
       this._drawGridToBoardDiv(board,this._elBoardDiv);
       this._drawBoardObjectsToBoardDiv(board,this._elBoardDiv);

       
    }

    // ################# Privates ###############################
    private _drawBoardObjectsToBoardDiv(board:Board,targetDiv:HTMLElement){
        board.boardObjects.forEach((bo:BoardObject)=>{
            
        })
    }
    private _drawGridToBoardDiv(board:Board,targetDiv:HTMLElement){
         for (let y = board.BoardSquareHeight; y < board.BoardSquareHeight; y++) {
            for (let x = 0; x < board.BoardSquareWidth; x++) {
                const cell = document.createElement("div");
                cell.classList.add("cell");
                cell.dataset.x = String(x);
                cell.dataset.y = String(y);

                cell.addEventListener("dragover", this._onCellDragoverEventHandler);
                cell.addEventListener("drop", this._onCellDroppedEventHandler);

                if(board===null){ throw new Error("No Board existing!"); }
                this._elBoardDiv?.appendChild(cell);
            }
        }

    }

    // ################# EVENTHANDLER ###############################
    private _onCellDragoverEventHandler = (e:Event)=>{
        e.preventDefault();
    }
    private _onCellDroppedEventHandler = (e:Event)=>{
        e.preventDefault();

        // if (draggedElement) {
        //     placeElement(draggedElement, x, y);
        //     draggedElement = null;
        //     return;
        // }

        // if (!draggedType) return;

        // if (draggedType === "marker") {
        //     placeElement(createMarker(draggedLetter), x, y);
        // } else {
        //     placeElement(createPlaced(draggedType), x, y);
        // }
    }


}