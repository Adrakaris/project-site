var MW = 300
var MH = 200


function scaleWidthHeight(imgElem) {
    let natWid = imgElem.naturalWidth;
    let natHei = imgElem.naturalHeight;
    console.log(natWid, natHei);
    let resizeFactorWidth = MW / natWid;
    
    // resize by width factor, if the image is wider than MH then resize by height as well
    let wid = natWid * resizeFactorWidth
    let hei = natHei * resizeFactorWidth
    if (hei > MH) {
        let resizeFactorHeight = MH / hei;
        wid *= resizeFactorHeight;
        hei *= resizeFactorHeight;
    }
    imgElem.width = wid;
    imgElem.height = hei;
    // if the height is less than MH, add a margin to top and bottom
    if (hei < MH) {
        let finalMargin = (MH - hei)/2;
        imgElem.style.marginTop = `${finalMargin}px`;
        imgElem.style.marginBottom = `${finalMargin}px`;
    }
}


function addProjects(projects) {
    

    let addList = document.getElementById("genprojects");
    projects.reverse().forEach(project => {
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
        pimg.style.resizeMode = "contain";
        // scaleWidthHeight(pimg);
        pimg.onload = function() {
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
    let i = 1
    proj.forEach(projn => {
        setTimeout(() => {
            projn.classList.add("visible");
        }, 500 * i);
        
        i++
    })
    
}


// oh to get a simple JSON file
let jsonObj;
let httpRequest = new XMLHttpRequest();
httpRequest.open("GET", "./scripts/projects.json", true);
httpRequest.send();
httpRequest.addEventListener("readystatechange", function() {
    if (this.readyState === this.DONE) {
        jsonObj = JSON.parse(this.response);
        // console.log(jsonObj);
        addProjects(jsonObj["projects"]);
    }
})

// projects.forEach(element => {
    
// });