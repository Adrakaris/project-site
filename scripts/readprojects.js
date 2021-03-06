"use strict";
// max width and height
const MW = 300;
const MH = 200;
// scale an image appropriately
function scaleWidthHeight(img) {
    let natWid = img.naturalWidth;
    let natHei = img.naturalHeight;
    let resizeFactorW = MW / natWid;
    // resize by width factor, if the image is wider than MH then resize by height as well
    let wid = natWid * resizeFactorW;
    let hei = natHei * resizeFactorW;
    if (hei > MH) {
        let resizeFactorH = MH / hei;
        wid *= resizeFactorH;
        hei *= resizeFactorH;
    }
    img.width = wid;
    img.height = hei;
    // if the height is less than MH add marign
    if (hei < MH) {
        let finalMargin = (MH - hei) / 2;
        img.style.marginTop = `${finalMargin}px`;
        img.style.marginBottom = `${finalMargin}px`;
    }
}
function addProjects(projects) {
    let addList = document.getElementById("genprojects");
    projects.reverse().forEach((project) => {
        // creation
        let pdiv = document.createElement("div");
        pdiv.classList.add("buttonwrapper");
        pdiv.classList.add("white");
        // pdiv.style.width = "30%";
        let pa = document.createElement("a");
        pa.setAttribute("href", project["link"]);
        pdiv.appendChild(pa);
        let pimg = document.createElement("img");
        pimg.src = project["image"];
        pimg.style.maxWidth = `${MW}px`;
        pimg.style.maxHeight = `${MH}px`;
        pimg.style.imageRendering = "pixelated";
        // pimg.style.resizeMode = "contain";
        // scaleWidthHeight(pimg);
        pimg.onload = function () {
            scaleWidthHeight(this);
        };
        pa.appendChild(pimg);
        let ptitle = document.createElement("h3");
        ptitle.innerText = project["title"];
        ptitle.style.textAlign = "left";
        pa.appendChild(ptitle);
        let pLanguage = document.createElement("p");
        pLanguage.classList.add("subheading");
        pLanguage.innerText = project["language"];
        pLanguage.style.fontStyle = "italic";
        pLanguage.style.textAlign = "left";
        pa.appendChild(pLanguage);
        let pDescription = document.createElement("p");
        pDescription.innerText = project["description"];
        pDescription.style.textAlign = "left";
        pa.appendChild(pDescription);
        // insertion
        addList.appendChild(pdiv);
    });
    // fade in
    let proj = document.querySelectorAll("#genprojects > div");
    let i = 1;
    proj.forEach((proj) => {
        setTimeout(() => {
            proj.classList.add("visible");
        }, 350 * i);
        i++;
    });
}
// oh to get a simple JSON file
let JsonObj;
let httpRequest = new XMLHttpRequest();
httpRequest.open("GET", "./scripts/projects.json", true);
httpRequest.send();
httpRequest.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
        JsonObj = JSON.parse(this.response);
        addProjects(JsonObj["projects"]);
    }
});
