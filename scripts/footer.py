from typing import List
from browser import document, html

# document has type browser.DOMNode


fc: List[str] = ["© 2021 Yijun Hu, all rights reserved.", "Designed by Yijun Hu"]


footer: html.DIV = document["genfooter"]

left: html.DIV = document.createElement("div")
right: html.DIV = document.createElement("div")

left.innerHTML = f"<p class='small'> {fc[0]} </p>"
right.innerHMTL = f"<p class='small ra'> {fc[1]} </p>"
print(left.innerHTML)
print(right.innerHTML)

footer.appendChild(left)
footer.appendChild(right)

for i in footer.children:
    print (i.children)