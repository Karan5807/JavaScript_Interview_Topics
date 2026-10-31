"use strict";
let count = 0;
const button = document.querySelector('button');
if (button) {
    button.addEventListener("click", function () {
        count++;
        button.textContent = `Clicked ${count} times`;
    });
}
