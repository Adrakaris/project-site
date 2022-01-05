from browser import document
from browser.local_storage import storage
from typing import Dict, Any

Theme = Dict[str, str]

light: Theme = {
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

dark: Theme = {  
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


style = document.documentElement.style
toggle = document["darkmode"]
current_theme = storage["theme"]

indicator: str = ""

# code

def set_theme(theme: Theme):
    global style
    for k, v in theme.items():
        # style[k] = v
        style.setProperty(k, v)
        

def toggle_theme(x):
    global indicator
    # print(x)
    # print(indicator)
    if indicator == "light":
        indicator = "dark"
        storage["theme"] = "dark"
        set_theme(dark)
    else:
        indicator = "light"
        storage["theme"] = "light"
        set_theme(light)



if current_theme == "dark":
    indicator = "dark"
    set_theme(dark)
else:
    indicator = "light"
    set_theme(light)
    
# add listener to togle
toggle.bind("click", toggle_theme)