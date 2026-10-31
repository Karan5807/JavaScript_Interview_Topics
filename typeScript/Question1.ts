let clickCount: number = 0;
const buttonElement: HTMLButtonElement | null = document.querySelector('button');

if (buttonElement) {
    buttonElement.addEventListener("click", function () {
        clickCount++;
        buttonElement.textContent = `Clicked ${clickCount} times`;
    }); 
}