import { BoardStorageService } from "./Application/Services/BoardStorageService.js";
import { IndexController } from "./UI/Controllers/IndexController.js";

const elInputLoadFile       :null|HTMLInputElement  = document.getElementById("loadFile") as HTMLInputElement;
const elButtonSaveBoard     :null|HTMLButtonElement = document.getElementById("saveBoard") as HTMLButtonElement;
const elBoard               :null|HTMLDivElement    = document.getElementById("board") as HTMLDivElement;

let __boardStorageService : BoardStorageService;
// Service INIT
__boardStorageService = new BoardStorageService();
const __indexController:IndexController = new IndexController(__boardStorageService);


const CELL_SIZE = 28;
const CELL_GAP = 1;


let selectedElement     :any = null;



/* GRÖSSE + ROTATION */
function applySize(el:any) {
    const rotation = parseInt(el.dataset.rotation || 0);
    if (el.dataset.type === "sofa") {
        if (rotation % 180 === 0) {
            el.style.width = (CELL_SIZE * 2 + CELL_GAP) + "px";
            el.style.height = CELL_SIZE + "px";
        } else {
            el.style.width = CELL_SIZE + "px";
            el.style.height = (CELL_SIZE * 2 + CELL_GAP) + "px";
        }
    } else {
        el.style.width = CELL_SIZE + "px";
        el.style.height = CELL_SIZE + "px";
    }
}

/* ROTATION MIT R */
document.addEventListener("keydown", function(e) {
    if (e.key.toLowerCase() === "r" && selectedElement) {
        let rot = parseInt(selectedElement.dataset.rotation || 0);
        rot = (rot + 90) % 360;
        selectedElement.dataset.rotation = rot;
        applySize(selectedElement);
    }
});


let onDOMContentLoadedEventHandler = (event:Event) =>{
    __indexController.initUI();
}

let onLoadFileInputElementChangeEventHandler = (ev:Event)=>{
    const input = ev.target as HTMLInputElement;
    if (!input || !input.files) return;
    const file = input.files[0];
    if (!file) return;
    __indexController.loadBoardFile(file);
    
}
let onSaveBoardButtonClickEventHandler = (ev:Event)=>{
    __indexController.saveBoard();
}

let onItemDroppedOnBoardEventHandler = (ev:any)=>{
    ev.preventDefault();
    const dataTransfer : DataTransfer = ev as DataTransfer;
    const id = ev.dataTransfer.getData("text/plain");
    const draggedElement = document.querySelector(`[data-id="${id}"]`) as HTMLElement;
    // Find Tile under mouse
    const elementUnderMouse: any = document.elementFromPoint(ev.clientX, ev.clientY);
    if (elementUnderMouse && elementUnderMouse.classList.contains('cell')) {
        let targetTileX = parseInt(elementUnderMouse.dataset.x || '0');
        let targetTileY = parseInt(elementUnderMouse.dataset.y || '0');
        __indexController.dropElementOnBoardsTile(targetTileX, targetTileY, draggedElement);
    }
}   

/* Register Events  */
elInputLoadFile.addEventListener("change", onLoadFileInputElementChangeEventHandler)
elButtonSaveBoard.addEventListener("click",onSaveBoardButtonClickEventHandler);
elBoard.addEventListener("drop", onItemDroppedOnBoardEventHandler);
elBoard.addEventListener("dragover", (e) => e.preventDefault());
document.addEventListener("DOMContentLoaded", onDOMContentLoadedEventHandler)

