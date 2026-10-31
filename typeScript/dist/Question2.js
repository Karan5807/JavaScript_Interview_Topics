"use strict";
// Write a function createHelloWorld. It should return a new function that always returns "Hello World".
let createHelloWorld = () => {
    return () => "Hello World";
};
const button2 = document.getElementById("button2");
button2.addEventListener("click", () => {
    button2.textContent = createHelloWorld()();
});
