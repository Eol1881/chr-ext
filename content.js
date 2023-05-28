// Create a button element
const button = document.createElement("button");
button.innerText = "Click me!";
button.style.position = "fixed";
button.style.bottom = "200px";
button.style.left = "200px";
button.style.zIndex = "9999";
button.style.height = "50px";
button.style.width = "150px";

// Add the button to the body of the webpage
document.body.appendChild(button);

// Add an event listener to the button
button.addEventListener("click", () => {
  console.log("Button clicked!");
});

// Prevent context menu
button.addEventListener("contextmenu", function(event) {
  event.preventDefault();
});

let isDragging = false;
let mouseOffset = { x: 0, y: 0 };

// Add event listeners to the button
button.addEventListener("mousedown", (event) => {
  if (event.button === 2) { // Check if right mouse button is pressed
    isDragging = true;
    mouseOffset.x = event.clientX - button.getBoundingClientRect().left;
    mouseOffset.y = event.clientY - button.getBoundingClientRect().top;
  }
});

button.addEventListener("mousemove", (event) => {
  if (isDragging) {
    button.style.left = event.clientX - mouseOffset.x + "px";
    button.style.top = event.clientY - mouseOffset.y + "px";
  }
});

button.addEventListener("mouseup", () => {
  isDragging = false;
});
