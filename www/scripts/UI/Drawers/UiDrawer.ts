import { Board } from "../../Domain/Models/Board";
import { BoardObject } from "../../Domain/Models/BoardObject";

export class UiDrawer{

    private _elBoardDiv : null| HTMLElement = document.getElementById("board");
    private _elToolboxDiv : null | HTMLElement = document.getElementById("tools");

    public drawCompleteUI(board:Board){
        if(this._elBoardDiv===null)throw new Error("No Target Board-Div found to draw board into");
        if(this._elToolboxDiv===null)throw new Error("No Target Toolbox-Div found to draw toolbox into");
        this.drawBoard(board,this._elBoardDiv);
        this.drawToolbox(this._elToolboxDiv);
    }

    public drawBoard(board:Board,elTargetDiv:HTMLElement){
        /* GRID ERZEUGEN */
       this._drawGridToBoardDiv(board,elTargetDiv);
       this._drawBoardObjectsToBoardDiv(board,elTargetDiv);
    }

    // <h3>Tools</h3>
    //             <div class="tool-item" draggable="true" data-type="sofa">Sofa (2x1)</div>
    //             <div class="tool-item" draggable="true" data-type="tisch">Tisch</div>
    //             <hr>
    //             <h4>Marker</h4>
    //             <div id="markerTools"></div>
    //             <div class="tool-item marker-tool" draggable="true" data-type="marker" data-letter>A</div>
    //             <div class="tool-item marker-tool" draggable="true" data-type="marker" data-letter>B</div>
    //             <div class="tool-item marker-tool" draggable="true" data-type="marker" data-letter>C</div>
    //             <div class="tool-item marker-tool" draggable="true" data-type="marker" data-letter>D</div>
    public drawToolbox(targetDiv:HTMLElement){
        // Create ToolsHeader -----
        let elToolsHeader : HTMLElement = document.createElement("h3");
        elToolsHeader.textContent ="Tools"
        targetDiv.appendChild(elToolsHeader);
        // Create Furniture Tools -----
        // SOFA
        let elFurnitureSofa :HTMLElement = document.createElement("div");
        elFurnitureSofa.className = "tool-item";
        elFurnitureSofa.draggable = true;
        elFurnitureSofa.dataset.id= "tool-item-sofa"
        elFurnitureSofa.dataset.type = "sofa";
        elFurnitureSofa.textContent = "Sofa (2x1)";
        elFurnitureSofa.addEventListener("dragstart", this._onToolboxItemDragstartEventHandler);
        targetDiv.appendChild(elFurnitureSofa);
        // DESK
        let elFurnitureDesk : HTMLElement = document.createElement("div")
        elFurnitureDesk.className = "tool-item";
        elFurnitureDesk.draggable = true;
        elFurnitureDesk.dataset.id= "tool-item-desk"
        elFurnitureDesk.dataset.type = "tisch";
        elFurnitureDesk.textContent = "Tisch";
        elFurnitureDesk.addEventListener("dragstart", this._onToolboxItemDragstartEventHandler);
        targetDiv.appendChild(elFurnitureDesk);
        // HR
        targetDiv.appendChild(document.createElement("hr"));
        // MARKER HEADER
        let elMarkerHeader : HTMLElement = document.createElement("h4");
        targetDiv.appendChild(elMarkerHeader);
        // Create Markers
        for (let i = 65; i <= 90; i++) {
            let letter : string = String.fromCharCode(i);
            let newMarker :null|HTMLElement = document.createElement("div");
            newMarker.className = "tool-item marker-tool";
            newMarker.draggable = true;
            newMarker.dataset.id = `tool-item-marker-${letter}`;
            newMarker.dataset.type = "marker";
            newMarker.dataset.letter = letter;
            newMarker.textContent = letter;
            newMarker.addEventListener("dragstart", this._onToolboxItemDragstartEventHandler);

           targetDiv.appendChild(newMarker);
           
        }


    }



    // ################# Privates ###############################
    private _drawBoardObjectsToBoardDiv(board:Board,targetDiv:HTMLElement){
        board.boardObjects.forEach((bo:BoardObject)=>{
            
        })
    }
    private _drawGridToBoardDiv(board:Board,targetDiv:HTMLElement){
         for (let y = 0; y < board.BoardSquareHeight; y++) {
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
    private _onToolboxItemDragstartEventHandler = (event:any)=>{
        if(event===null)throw new Error("No valid Event Parameter during dragStart Event");
        if(event.dataTransfer===null)throw new Error("No valid Event.dataTarnsfer Parameter during dragStart Event");
        event.dataTransfer.setData("text/plain", event.target.dataset.id);
    }

    private _onCellDragoverEventHandler = (e:Event)=>{
        e.preventDefault();
    }
    private _onCellDroppedEventHandler = (event:any)=>{
        event.preventDefault();
        const dataTransfer : DataTransfer = event as DataTransfer;
        console.log(dataTransfer);
        const id = event.dataTransfer.getData("text/plain");
        const draggedElement = document.querySelector(`[data-id="${id}"]`);
        console.log(draggedElement);

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