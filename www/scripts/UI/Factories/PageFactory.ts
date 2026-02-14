import { HtmlElementFactory} from    "./../Factories/HtmlElementFactory.js"


export class PageFactory{

    private static descriptionText : null|HTMLTextAreaElement = document.getElementById("descriptionText") as HTMLTextAreaElement;


    // public static createPageFromBoardFile(xmlText:string){

    //     document.querySelectorAll(".placed").forEach(el => el.remove());
    //     const parser = new DOMParser();
    //     const xml = parser.parseFromString(xmlText, "text/xml");
        
    //     if (this.descriptionText === null) {
    //         throw new Error("No Description Text Element found");
    //     }
        
    //     const desc = xml.getElementsByTagName("description")[0];
    //     this.descriptionText.value = desc ? String(desc.textContent) : "";
        
    //     const objects = xml.getElementsByTagName("object");
    //     for (let obj of objects) {
    //         const cell = HtmlElementFactory.createCell(obj);
    //         if (!cell) continue;

    //         cell.addEventListener("click", e => {
    //             e.stopPropagation();
    //             PageFactory._selectElementHandler(cell);
    //         });

    //         // cell.addEventListener("dragstart", function() {
    //         //     draggedElement = this;
    //         // });

    //         //     cell.appendChild(HtmlElementFactory.createElementFromObject(obj));
    //         // }
    //         // cell.addEventListener("contextmenu", e => {
    //         //     e.preventDefault();
    //         //     el.remove();
    //         // });
        
    //     }
    // }

    // private static _selectElementHandler(el:any) {
    //     if (selectedElement) selectedElement.style.outline = "none";
    //     selectedElement = el;
    //     selectedElement.style.outline = "2px solid red";
    // }

}