// themes

// NOTE: light and dark have been switched around, because it is nicer to have dark theme by default

type Theme = { [key: string]: string };

var dark: Theme = {
    "--bg-col": "#ffffff",
    "--bg-active": "#f1f2e9",
    "--txt-col": "#000000",
    "--band-col": "#a17667",
    "--band-txt": "#f1f2e9",
    "--pink": "#a17667",
    "--blue": "#1f7282",
    "--green": "#3a6342",
    "--overlay": "#00000030",
    "--filter": "brightness(1) contrast(1)",
    "--img-bg": "#0000"
}

var light: Theme = {  
    "--bg-col": "#2e2e2e",
    "--bg-active": "#333333",
    "--txt-col": "#eaeaea",
    "--band-col": "#6e5046",
    "--band-txt": "#f1f2e9",
    "--pink": "#c7917f",
    "--blue": "#52b5c4",
    "--green": "#3a6342",
    "--overlay": "#00000030",
    "--filter": "brightness(.8) contrast(1.2)",
    "--img-bg": "#fff"
}


// code


function setTheme(thema: Theme) {
    // iterate through every key value pair in the theme
    for (let key in thema) {
        // set the css variable to the value
        document.documentElement.style.setProperty(key, thema[key]);
    }
}


let style: CSSStyleDeclaration = document.documentElement.style
// var cssRoot = styleSheet.querySelector(":root");  // document.querySelector("#theme-link").querySelector(":root");
const toggle: HTMLButtonElement = document.getElementById("darkmode") as HTMLButtonElement;
const currentTheme: string|null = localStorage.getItem("theme");

let indicator: string;

if (currentTheme == "dark") {  // seems redudnant but in case localStorage has none
    indicator = "dark"
    setTheme(dark);
} else {
    indicator = "light"
    setTheme(light);
}



toggle.addEventListener("click", function() {
    // we need to check if it's dark or light
    if (indicator == "dark") {
        indicator = "light";
        toggle.innerText = "Light Mode";
        localStorage.setItem("theme", "light");
        setTheme(light);
    } else {
        indicator = "dark";
        toggle.innerText = "Dark Mode";
        localStorage.setItem("theme", "dark");
        setTheme(dark);
    }
});


