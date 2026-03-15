import { Board } from "../../Domain/Models/Board.js";

export class BoardStorageService{

    public saveBoardAsJSON(board:Board,filename:string){
        const fileContent : string = JSON.stringify(board);
        // Create a downloadlink to store the  xml data and activate
        const blob = new Blob([fileContent], { type: "text/xml" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = filename;
        a.click();
    }


    // /* XML */
    // /* XML SPEICHERN */
    // public saveXML(descriptionText:HTMLTextAreaElement) {
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
    //             xml += `  <object type="${el.dataset.type}" x="${el.dataset.x}" y="${el.dataset.y}" rotation="${el.dataset.rotation}" />\n`;
    //         }
    //     });

    //     xml += `</level>`;

    //     const blob = new Blob([xml], { type: "text/xml" });
    //     const a = document.createElement("a");
    //     a.href = URL.createObjectURL(blob);
    //     a.download = "heroquest_level.xml";
    //     a.click();
    // }

// /* XML LADEN */
// loadFile.addEventListener("change", function() {
//     if(this===null || this.files===null) return;
//     const file = this.files[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onload = e => loadXML(e.target?.result);
//     reader.readAsText(file);
// });
public loadBoardFromFile(file:File):Promise<Board>{
    return new Promise((resolve,reject)=>{
    const reader = new FileReader();

        reader.onload = (e: ProgressEvent<FileReader>) => {
            try {
                const fileContent = e.target?.result as string;
                const board:Board = JSON.parse(fileContent);
                resolve(board);
            } catch (err) {
                reject(err);
            }
        };
        reader.onerror = () => {
            reject(reader.error);
        };
        reader.readAsText(file);
    });
}


// private _CreateBoardFromXML(xmlText:string):Board{
//     let board:Board = new Board();
//         const parser = new DOMParser();
//         const xml = parser.parseFromString(xmlText, "text/xml");
//         // Read Board Description
//         const desc = xml.getElementsByTagName("description")[0];
//         board.description = desc ? String(desc.textContent) : "";

      
//         // const boardObject:BoardObject = new BoardObject();
        
//         const objects = Array.from(xml.getElementsByTagName("object"));
//         const boardObjects = objects.map(el => {
//             const attrs = Object.fromEntries(
//                 Array.from(el.attributes).map(a => [a.name, a.value])
//             );

//             const obj = new BoardObject();
//             return mapAttributesToInstance(obj, attrs);
//         });


            // cell.addEventListener("click", e => {
            //     e.stopPropagation();
            //     PageFactory._selectElementHandler(cell);
            // });

            // cell.addEventListener("dragstart", function() {
            //     draggedElement = this;
            // });

            //     cell.appendChild(HtmlElementFactory.createElementFromObject(obj));
            // }
            // cell.addEventListener("contextmenu", e => {
            //     e.preventDefault();
            //     el.remove();
            // });








//     return board;
// }


// public loadXML(file: File): Promise<string> {
//     return new Promise((resolve, reject) => {
//         const reader = new FileReader();

//         reader.onload = (e: ProgressEvent<FileReader>) => {
//             try {
//                 const xmlText = e.target?.result as string;
//                 // this.handleLoadedXML(xmlText);
//                 resolve(xmlText);
//             } catch (err) {
//                 reject(err);
//             }
//         };

//         reader.onerror = () => {
//             reject(reader.error);
//         };

//         reader.readAsText(file);
//     });
// }

// private handleLoadedXML(xmlText: string) {
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
//         cell.appendChild(HtmlElementFactory.createElementFromObject(obj));
//     }
// }




} // EndClass