// projects type
type Project = {[key: string]: string};

// max width and height
const MW = 300;
const MH = 200;

// scale an image appropriately
function scaleWidthHeight(img: HTMLImageElement): void {
    let natWid = img.naturalWidth;
    let natHei = img.naturalHeight;
    let resizeFactorW: number = MW / natWid;

    // resize by width factor, if the image is wider than MH then resize by height as well
    let wid: number = natWid * resizeFactorW;
    let hei: number = natHei * resizeFactorW;
    if (hei > MH) {
        let resizeFactorH: number = MH / hei;
        wid *= resizeFactorH;
        hei *= resizeFactorH;
    }
    img.width = wid;
    img.height = hei;
    
    // if the height is less than MH add marign
    if (hei < MH) {
        let finalMargin: number = (MH - hei) / 2;
        img.style.marginTop = `${finalMargin}px`;
        img.style.marginBottom = `${finalMargin}px`;
    }
}

function addProjects(projects: Project[]) {
    let addList: HTMLElement|null = document.getElementById("genprojects");


    projects.reverse().forEach((project: Project) => {
        // creation
        let pdiv: HTMLDivElement = document.createElement("div");
        pdiv.classList.add("buttonwrapper");
        pdiv.classList.add("white");
        // pdiv.style.width = "30%";

        let pa: HTMLAnchorElement = document.createElement("a");
        pa.setAttribute("href", project["link"]);
        pdiv.appendChild(pa);
        
        let pimg: HTMLImageElement = document.createElement("img");
        pimg.src = project["image"];
        pimg.style.maxWidth = `${MW}px`;
        pimg.style.maxHeight = `${MH}px`;
        pimg.style.imageRendering = "pixelated";
        // pimg.style.resizeMode = "contain";
        // scaleWidthHeight(pimg);
        pimg.onload = function() {
            scaleWidthHeight(this as HTMLImageElement);
        };
        pa.appendChild(pimg);
        

        let ptitle: HTMLHeadingElement = document.createElement("h3");
        ptitle.innerText = project["title"];
        ptitle.style.textAlign = "left";
        pa.appendChild(ptitle);

        let pLanguage: HTMLParagraphElement = document.createElement("p");
        pLanguage.classList.add("subheading");
        pLanguage.innerText = project["language"];
        pLanguage.style.fontStyle = "italic";
        pLanguage.style.textAlign = "left";
        pa.appendChild(pLanguage);

        let pDescription: HTMLParagraphElement = document.createElement("p");
        pDescription.innerText = project["description"];
        pDescription.style.textAlign = "left";
        pa.appendChild(pDescription);

        // insertion
        addList!.appendChild(pdiv);
    });

    // fade in
    let proj: NodeListOf<HTMLDivElement> = document.querySelectorAll("#genprojects > div");
    let i = 1;
    proj.forEach((proj: HTMLDivElement) => {
        setTimeout(() => {
            proj.classList.add("visible");
        }, 350*i);
        i++;
    })
}

// oh to get a simple JSON file
let JsonObj: {"projects": Project[]};
let httpRequest = new XMLHttpRequest();
httpRequest.open("GET", "./scripts/projects.json", true);
httpRequest.send();
httpRequest.addEventListener("readystatechange", function() {
    if (this.readyState === this.DONE) {
        JsonObj = JSON.parse(this.response) as {"projects": Project[]};
        addProjects(JsonObj["projects"])
    }
})