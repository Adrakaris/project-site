"use strict";
// stored details
let fc = ["© 2021 Yijun Hu, all rights reserved.", "Designed by Yijun Hu"];
// code
let footer = document.querySelector("#genfooter");
let left = document.createElement("div");
left.innerHTML = `<p class="small">
                            ${fc[0]}
                        </p>`;
let right = document.createElement("div");
right.innerHTML = `<p class="small ra">
                            ${fc[1]}
                        </p>`;
footer.appendChild(left);
footer.appendChild(right);
