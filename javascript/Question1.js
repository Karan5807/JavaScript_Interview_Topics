// Make the text within the button display the number of times the button has been clicked.

let button = document.querySelector('button');
let count = 0;

button.addEventListener("click" , function() {
    count++;
    button.textContent = `Clicked ${count} times`;
}
)