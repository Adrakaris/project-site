
function addProjects(projects) {
    var MW = 300
    var MH = 200

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
        console.log(`${pimg.width}, ${pimg.height}`);
        let resizeFactor;
        let resizeheight;
        if (pimg.width > MW) {
            resizeFactor = pimg.width / MW;  // new div old
            resizeheight = pimg.height / resizeFactor;
        } else {
            resizeheight = pimg.height;

        }
        console.log(resizeheight);
        let finalMargin = (MH - Math.min(MH, resizeheight));
        pimg.style.marginBottom = `${finalMargin/2}px`;
        pimg.style.marginTop = `${finalMargin/2}px`;
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