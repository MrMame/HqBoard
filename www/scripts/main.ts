import { BoardStorageService } from "./Application/Services/BoardStorageService.js";
import { IndexController } from "./UI/Controllers/IndexController.js";

// const board = document.getElementById("board");
const markerTools = document.getElementById("markerTools");
const loadFileInputElement :null|HTMLInputElement= document.getElementById("loadFile") as HTMLInputElement;
const elButtonSaveBoard :null|HTMLButtonElement= document.getElementById("saveBoard") as HTMLButtonElement;
const elBoard :null|HTMLDivElement = document.getElementById("board") as HTMLDivElement;




let __boardStorageService : BoardStorageService;
// Service INIT
__boardStorageService = new BoardStorageService();
const __indexController:IndexController = new IndexController(__boardStorageService);






const CELL_SIZE = 28;
const CELL_GAP = 1;
// const STEP = CELL_SIZE + CELL_GAP;

// let draggedType         :any = null;
// let draggedLetter       :any = null;
// let draggedElement      :any = null;
let selectedElement     :any = null;

// /* DESCRIPTION TOGGLE */
// function toggleDescription() {
//     const panel = document.getElementById("descriptionPanel");
//     if(panel===null){ throw new Error("No Description Panel existing!"); }
//     panel.style.display = panel.style.display === "none" ? "block" : "none";
// }


// /* GRID ERZEUGEN */
// for (let y = 0; y < 19; y++) {
//     for (let x = 0; x < 26; x++) {
//         const cell = document.createElement("div");
//         cell.classList.add("cell");
//         cell.dataset.x = String(x);
//         cell.dataset.y = String(y);

//         cell.addEventListener("dragover", e => e.preventDefault());

//         cell.addEventListener("drop", function(e) {
//             e.preventDefault();

//             if (draggedElement) {
//                 placeElement(draggedElement, x, y);
//                 draggedElement = null;
//                 return;
//             }

//             if (!draggedType) return;

//             if (draggedType === "marker") {
//                 placeElement(createMarker(draggedLetter), x, y);
//             } else {
//                 placeElement(createPlaced(draggedType), x, y);
//             }
//         });

//         if(board===null){ throw new Error("No Board existing!"); }
//         board.appendChild(cell);
//     }
// }

// /* TOOL DRAG */
// document.querySelectorAll(".tool-item").forEach(item => {
//     item.addEventListener("dragstart", function(event) {
//         const dragged : HTMLElement = event.currentTarget as HTMLElement;
//         draggedType = dragged.dataset.type;
//         draggedLetter = dragged.dataset.letter;
//     });
// });

// /* MARKER A-Z */
// for (let i = 65; i <= 90; i++) {
//     const letter = String.fromCharCode(i);
//     const div = document.createElement("div");
//     div.className = "tool-item marker-tool";
//     div.textContent = letter;
//     div.draggable = true;
//     div.dataset.type = "marker";
//     div.dataset.letter = letter;

//     div.addEventListener("dragstart", function() {
//         draggedType = "marker";
//         draggedLetter = letter;
//     });

//     if(markerTools===null){ throw new Error("No marker Tools existing!"); }
//     markerTools.appendChild(div);
// }

// /* ELEMENT POSITIONIEREN */
// function placeElement(el:any, x:any, y:any) {
//     el.dataset.x = x;
//     el.dataset.y = y;

//     el.style.left = (x * STEP) + "px";
//     el.style.top = (y * STEP) + "px";

//     if(board===null){ throw new Error("No Board existing!"); }
//     board.appendChild(el);
// }

/* OBJEKT ERZEUGEN */
// function createPlaced(type:any, rotation = 0) {

//     const el = document.createElement("div");
//     el.className = "placed";
//     el.draggable = true;
//     el.dataset.type = type;
//     el.dataset.rotation = String(rotation);
//     el.textContent = type;

//     applySize(el);

//     el.addEventListener("click", e => {
//         e.stopPropagation();
//         selectElement(el);
//     });

//     el.addEventListener("dragstart", function() {
//         draggedElement = this;
//     });

//     el.addEventListener("dblclick", function() {
//         const text = prompt("Tooltip Text bearbeiten:", el.dataset.tooltip || "");
//         if (text !== null) {
//             el.dataset.tooltip = text;
//             el.title = text;
//         }
//     });

//     el.addEventListener("contextmenu", e => {
//         e.preventDefault();
//         el.remove();
//     });

//     return el;
// }

// /* MARKER */
// function createMarker(letter:any) {


//     const el = document.createElement("div");
//     el.className = "placed marker";
//     el.draggable = true;
//     el.dataset.type = "marker";
//     el.dataset.rotation = String(0);
//     el.textContent = letter;

//     el.style.width = CELL_SIZE + "px";
//     el.style.height = CELL_SIZE + "px";

//     el.addEventListener("click", e => {
//         e.stopPropagation();
//         selectElement(el);
//     });

//     el.addEventListener("dragstart", function() {
//         draggedElement = this;
//     });

//     el.addEventListener("contextmenu", e => {
//         e.preventDefault();
//         el.remove();
//     });

//     return el;
// }

// /* AUSWAHL */
// function selectElement(el:any) {
//     if (selectedElement) selectedElement.style.outline = "none";
//     selectedElement = el;
//     selectedElement.style.outline = "2px solid red";
// }

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

    //el.style.transform = `rotate(${rotation}deg)`;
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

// /* XML */
// /* XML SPEICHERN */
// function saveXML() {
//     let xml = `<level>\n`;

//     xml += `  <description><![CDATA[${descriptionText?.value}]]></description>\n`;

//     document.querySelectorAll(".placed").forEach(placedEl => {
//         const el :HTMLElement = placedEl as HTMLElement;
//         const cell = el.parentElement as HTMLElement;
//         if(cell===null)throw new Error("Cell is not existing");
//         const x = cell.dataset.x;
//         const y = cell.dataset.y;

//         if (el.dataset.type === "marker") {
//             xml += `  <object type="marker" letter="${el.dataset.letter}" x="${el.dataset.x}" y="${el.dataset.y}">\n`;
//             xml += `    <tooltip><![CDATA[${el.dataset.tooltip || ""}]]></tooltip>\n`;
//             xml += `  </object>\n`;
//         } else {
//             xml += `  <object type="${el.dataset.type}" x="${el.dataset.x}" y="${el.dataset.y}" rotation="${selectedElement.dataset.rotation}" />\n`;
//         }
//     });

//     xml += `</level>`;

//     const blob = new Blob([xml], { type: "text/xml" });
//     const a = document.createElement("a");
//     a.href = URL.createObjectURL(blob);
//     a.download = "heroquest_level.xml";
//     a.click();
// }

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
    console.log(dataTransfer);
    const id = ev.dataTransfer.getData("text/plain");
    const draggedElement = document.querySelector(`[data-id="${id}"]`) as HTMLElement;
    console.log(draggedElement);

    __indexController.dropToolboxObjectOnBoard(ev.clientX, ev.clientY, draggedElement);
}   

/* XML LADEN */
loadFileInputElement.addEventListener("change", onLoadFileInputElementChangeEventHandler)
elButtonSaveBoard.addEventListener("click",onSaveBoardButtonClickEventHandler);
elBoard.addEventListener("drop", onItemDroppedOnBoardEventHandler);
elBoard.addEventListener("dragover", (e) => e.preventDefault());
document.addEventListener("DOMContentLoaded", onDOMContentLoadedEventHandler)



// function loadXML(xmlText:any) {
//     document.querySelectorAll(".placed").forEach(el => el.remove());

//     const parser = new DOMParser();
//     const xml = parser.parseFromString(xmlText, "text/xml");

//     if(descriptionText===null)throw new Error("No Description Text Element found");
//     const desc = xml.getElementsByTagName("description")[0];
//     descriptionText.value = desc ? String(desc.textContent) : "";

//     const objects = xml.getElementsByTagName("object");

//     for (let obj of objects) {
//         const type = obj.getAttribute("type");
//         const x = obj.getAttribute("x");
//         const y = obj.getAttribute("y");

//         const cell = document.querySelector(`.cell[data-x="${x}"][data-y="${y}"]`);
//         if (!cell) continue;

//         if (type === "marker") {
//             const letter = obj.getAttribute("letter");
//             // const tooltipNode = obj.getElementsByTagName("tooltip")[0];
//             // const tooltip = tooltipNode ? tooltipNode.textContent : "";
//             cell.appendChild(createMarker(letter));
//         } else {
//             cell.appendChild(createPlaced(type));
//         }
//     }
// }
