// Write a function createHelloWorld. It should return a new function that always returns "Hello World".
let createHelloWorld = function() {
    return function() {
        return "Hello World";
    }
}
    
let button2 = document.getElementById('question2');
button2.addEventListener("click" , function() {
    button2.textContent = createHelloWorld()(); 
    if(button2.textContent === "Hello World"){{
    console.log("Clicked the button and it returned Hello World");
}} 
}
)
