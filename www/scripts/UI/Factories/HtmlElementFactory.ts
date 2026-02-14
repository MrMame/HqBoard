export class HtmlElementFactory{

    private static CELL_SIZE = 28;
    private static CELL_GAP = 1;
    private static STEP = HtmlElementFactory.CELL_SIZE + HtmlElementFactory.CELL_GAP;


    public static createElementFromObject(obj:any):HTMLElement{
        const type = obj.getAttribute("type");
        if (type === "marker") {
                const letter = obj.getAttribute("letter");
                // const tooltipNode = obj.getElementsByTagName("tooltip")[0];
                // const tooltip = tooltipNode ? tooltipNode.textContent : "";
                return HtmlElementFactory.createMarker(obj);
            } else {
                return HtmlElementFactory.createFurniture(obj);
            }

    }
    public static createBoard():HTMLElement{return new HTMLElement}
    public static createMarker(obj:any):HTMLElement{
        
        const letter = obj.getAttribute("letter");

        const el = document.createElement("div");
        el.className = "placed marker";
        el.draggable = true;
        el.dataset.type = "marker";
        el.dataset.rotation = String(0);
        el.textContent = letter;

        el.style.width = HtmlElementFactory.CELL_SIZE + "px";
        el.style.height = HtmlElementFactory.CELL_SIZE + "px";

        // el.addEventListener("click", e => {
        //     e.stopPropagation();
        //     HtmlElementFactory._selectElementHandler(el);
        // });

        // el.addEventListener("dragstart", function() {
        //     draggedElement = this;
        // });

        el.addEventListener("contextmenu", e => {
            e.preventDefault();
            el.remove();
        });

        return el;
    }
    public static createFurniture(furnitureType:null|string):HTMLElement{
        return new HTMLElement
    }

    public static createCell(obj:any):null|Element{
        const x = obj.getAttribute("x");
        const y = obj.getAttribute("y");
        const cell = document.querySelector(`.cell[data-x="${x}"][data-y="${y}"]`);
        return cell;
    }
    




}