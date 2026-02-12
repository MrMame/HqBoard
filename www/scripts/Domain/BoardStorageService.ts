

export class BoardStorageService{


    private descriptionText : null|HTMLTextAreaElement = document.getElementById("descriptionText") as HTMLTextAreaElement;


    /* XML */
    /* XML SPEICHERN */
    public saveXML(descriptionText:HTMLTextAreaElement) {
        let xml = `<level>\n`;

        xml += `  <description><![CDATA[${descriptionText?.value}]]></description>\n`;

        document.querySelectorAll(".placed").forEach(placedEl => {
            const el :HTMLElement = placedEl as HTMLElement;
            const cell = el.parentElement as HTMLElement;
            if(cell===null)throw new Error("Cell is not existing");
            const x = cell.dataset.x;
            const y = cell.dataset.y;

            if (el.dataset.type === "marker") {
                xml += `  <object type="marker" letter="${el.dataset.letter}" x="${el.dataset.x}" y="${el.dataset.y}">\n`;
                xml += `    <tooltip><![CDATA[${el.dataset.tooltip || ""}]]></tooltip>\n`;
                xml += `  </object>\n`;
            } else {
                xml += `  <object type="${el.dataset.type}" x="${el.dataset.x}" y="${el.dataset.y}" rotation="${el.dataset.rotation}" />\n`;
            }
        });

        xml += `</level>`;

        const blob = new Blob([xml], { type: "text/xml" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "heroquest_level.xml";
        a.click();
    }

// /* XML LADEN */
// loadFile.addEventListener("change", function() {
//     if(this===null || this.files===null) return;
//     const file = this.files[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onload = e => loadXML(e.target?.result);
//     reader.readAsText(file);
// });

    public loadXML(file:File) {
        let ontextLoadhandler
        const reader = new FileReader();
        // reader.onload = e => boardStorageService.loadXML(e.target?.result);
        reader.onload = this.ontextLoadHandler;
        reader.readAsText(file);
    }

    private ontextLoadHandler = ( e:any)=>{

        let xmlText = e.target?.result;

        document.querySelectorAll(".placed").forEach(el => el.remove());

        const parser = new DOMParser();
        const xml = parser.parseFromString(xmlText, "text/xml");

        if(this.descriptionText===null)throw new Error("No Description Text Element found");
        const desc = xml.getElementsByTagName("description")[0];
        this.descriptionText.value = desc ? String(desc.textContent) : "";

        const objects = xml.getElementsByTagName("object");

        for (let obj of objects) {
            const type = obj.getAttribute("type");
            const x = obj.getAttribute("x");
            const y = obj.getAttribute("y");

            const cell = document.querySelector(`.cell[data-x="${x}"][data-y="${y}"]`);
            if (!cell) continue;

            if (type === "marker") {
                const letter = obj.getAttribute("letter");
                // const tooltipNode = obj.getElementsByTagName("tooltip")[0];
                // const tooltip = tooltipNode ? tooltipNode.textContent : "";
                cell.appendChild(this.createMarker(letter));
            } else {
                cell.appendChild(createPlaced(type));
            }
        }

    }



} // EndClass