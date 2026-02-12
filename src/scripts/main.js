"use strict";
const board = document.getElementById("board");
const markerTools = document.getElementById("markerTools");
const loadFile = document.getElementById("loadFile");
const descriptionText = document.getElementById("descriptionText");
const CELL_SIZE = 28;
const CELL_GAP = 1;
const STEP = CELL_SIZE + CELL_GAP;
let draggedType = null;
let draggedLetter = null;
let draggedElement = null;
let selectedElement = null;
/* DESCRIPTION TOGGLE */
function toggleDescription() {
    const panel = document.getElementById("descriptionPanel");
    if (panel === null) {
        throw new Error("No Description Panel existing!");
    }
    panel.style.display = panel.style.display === "none" ? "block" : "none";
}
/* GRID ERZEUGEN */
for (let y = 0; y < 19; y++) {
    for (let x = 0; x < 26; x++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.x = String(x);
        cell.dataset.y = String(y);
        cell.addEventListener("dragover", e => e.preventDefault());
        cell.addEventListener("drop", function (e) {
            e.preventDefault();
            if (draggedElement) {
                placeElement(draggedElement, x, y);
                draggedElement = null;
                return;
            }
            if (!draggedType)
                return;
            if (draggedType === "marker") {
                placeElement(createMarker(draggedLetter), x, y);
            }
            else {
                placeElement(createPlaced(draggedType), x, y);
            }
        });
        if (board === null) {
            throw new Error("No Board existing!");
        }
        board.appendChild(cell);
    }
}
/* TOOL DRAG */
document.querySelectorAll(".tool-item").forEach(item => {
    item.addEventListener("dragstart", function (event) {
        const dragged = event.currentTarget;
        draggedType = dragged.dataset.type;
        draggedLetter = dragged.dataset.letter;
    });
});
/* MARKER A-Z */
for (let i = 65; i <= 90; i++) {
    const letter = String.fromCharCode(i);
    const div = document.createElement("div");
    div.className = "tool-item marker-tool";
    div.textContent = letter;
    div.draggable = true;
    div.dataset.type = "marker";
    div.dataset.letter = letter;
    div.addEventListener("dragstart", function () {
        draggedType = "marker";
        draggedLetter = letter;
    });
    if (markerTools === null) {
        throw new Error("No marker Tools existing!");
    }
    markerTools.appendChild(div);
}
/* ELEMENT POSITIONIEREN */
function placeElement(el, x, y) {
    el.dataset.x = x;
    el.dataset.y = y;
    el.style.left = (x * STEP) + "px";
    el.style.top = (y * STEP) + "px";
    if (board === null) {
        throw new Error("No Board existing!");
    }
    board.appendChild(el);
}
/* OBJEKT ERZEUGEN */
function createPlaced(type, rotation = 0) {
    const el = document.createElement("div");
    el.className = "placed";
    el.draggable = true;
    el.dataset.type = type;
    el.dataset.rotation = String(rotation);
    el.textContent = type;
    applySize(el);
    el.addEventListener("click", e => {
        e.stopPropagation();
        selectElement(el);
    });
    el.addEventListener("dragstart", function () {
        draggedElement = this;
    });
    el.addEventListener("dblclick", function () {
        const text = prompt("Tooltip Text bearbeiten:", el.dataset.tooltip || "");
        if (text !== null) {
            el.dataset.tooltip = text;
            el.title = text;
        }
    });
    el.addEventListener("contextmenu", e => {
        e.preventDefault();
        el.remove();
    });
    return el;
}
/* MARKER */
function createMarker(letter) {
    const el = document.createElement("div");
    el.className = "placed marker";
    el.draggable = true;
    el.dataset.type = "marker";
    el.dataset.rotation = String(0);
    el.textContent = letter;
    el.style.width = CELL_SIZE + "px";
    el.style.height = CELL_SIZE + "px";
    el.addEventListener("click", e => {
        e.stopPropagation();
        selectElement(el);
    });
    el.addEventListener("dragstart", function () {
        draggedElement = this;
    });
    el.addEventListener("contextmenu", e => {
        e.preventDefault();
        el.remove();
    });
    return el;
}
/* AUSWAHL */
function selectElement(el) {
    if (selectedElement)
        selectedElement.style.outline = "none";
    selectedElement = el;
    selectedElement.style.outline = "2px solid red";
}
/* GRÖSSE + ROTATION */
function applySize(el) {
    const rotation = parseInt(el.dataset.rotation || 0);
    if (el.dataset.type === "sofa") {
        if (rotation % 180 === 0) {
            el.style.width = (CELL_SIZE * 2 + CELL_GAP) + "px";
            el.style.height = CELL_SIZE + "px";
        }
        else {
            el.style.width = CELL_SIZE + "px";
            el.style.height = (CELL_SIZE * 2 + CELL_GAP) + "px";
        }
    }
    else {
        el.style.width = CELL_SIZE + "px";
        el.style.height = CELL_SIZE + "px";
    }
    //el.style.transform = `rotate(${rotation}deg)`;
}
/* ROTATION MIT R */
document.addEventListener("keydown", function (e) {
    if (e.key.toLowerCase() === "r" && selectedElement) {
        let rot = parseInt(selectedElement.dataset.rotation || 0);
        rot = (rot + 90) % 360;
        selectedElement.dataset.rotation = rot;
        applySize(selectedElement);
    }
});
/* XML */
/* XML SPEICHERN */
function saveXML() {
    let xml = `<level>\n`;
    xml += `  <description><![CDATA[${descriptionText === null || descriptionText === void 0 ? void 0 : descriptionText.value}]]></description>\n`;
    document.querySelectorAll(".placed").forEach(placedEl => {
        const el = placedEl;
        const cell = el.parentElement;
        if (cell === null)
            throw new Error("Cell is not existing");
        const x = cell.dataset.x;
        const y = cell.dataset.y;
        if (el.dataset.type === "marker") {
            xml += `  <object type="marker" letter="${el.dataset.letter}" x="${el.dataset.x}" y="${el.dataset.y}">\n`;
            xml += `    <tooltip><![CDATA[${el.dataset.tooltip || ""}]]></tooltip>\n`;
            xml += `  </object>\n`;
        }
        else {
            xml += `  <object type="${el.dataset.type}" x="${el.dataset.x}" y="${el.dataset.y}" rotation="${selectedElement.dataset.rotation}" />\n`;
        }
    });
    xml += `</level>`;
    const blob = new Blob([xml], { type: "text/xml" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "heroquest_level.xml";
    a.click();
}
/* XML LADEN */
loadFile.addEventListener("change", function () {
    if (this === null || this.files === null)
        return;
    const file = this.files[0];
    if (!file)
        return;
    const reader = new FileReader();
    reader.onload = e => { var _a; return loadXML((_a = e.target) === null || _a === void 0 ? void 0 : _a.result); };
    reader.readAsText(file);
});
function loadXML(xmlText) {
    document.querySelectorAll(".placed").forEach(el => el.remove());
    const parser = new DOMParser();
    const xml = parser.parseFromString(xmlText, "text/xml");
    if (descriptionText === null)
        throw new Error("No Description Text Element found");
    const desc = xml.getElementsByTagName("description")[0];
    descriptionText.value = desc ? String(desc.textContent) : "";
    const objects = xml.getElementsByTagName("object");
    for (let obj of objects) {
        const type = obj.getAttribute("type");
        const x = obj.getAttribute("x");
        const y = obj.getAttribute("y");
        const cell = document.querySelector(`.cell[data-x="${x}"][data-y="${y}"]`);
        if (!cell)
            continue;
        if (type === "marker") {
            const letter = obj.getAttribute("letter");
            // const tooltipNode = obj.getElementsByTagName("tooltip")[0];
            // const tooltip = tooltipNode ? tooltipNode.textContent : "";
            cell.appendChild(createMarker(letter));
        }
        else {
            cell.appendChild(createPlaced(type));
        }
    }
}
//# sourceMappingURL=main.js.map