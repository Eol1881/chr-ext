// This code will be executed after page load

class Button {
  constructor(...classNames) {
    this.button = document.createElement('button');
    this.button.classList.add(...classNames);
  }

  setText(text) {
    this.button.innerText = text;
    return this;
  }

  inject(parent) {
    parent.appendChild(this.button);
    return this;
  }
}

// Create a wrapper
const btnsWrapper = document.createElement('div');
btnsWrapper.classList.add('ext__wrapper');
if (isHidden === true) {
  console.log('loaded ishidden === true')
  btnsWrapper.classList.add('hidden');
}
document.body.appendChild(btnsWrapper);

// Create a container
const btnsContainer = document.createElement('div');
function setBtnsContainerPos(x, y) {
  btnsContainer.style.left = x;
  btnsContainer.style.top = y;
}
setBtnsContainerPos(btnsContainerPosX, btnsContainerPosY);
btnsContainer.classList.add('ext__container');
btnsWrapper.appendChild(btnsContainer);

// Create a button elements
const resetBtn = new Button('ext__btn', 'ext__btn--reset').inject(btnsContainer).button;
const resetBtnContent = document.createElement('span');
resetBtnContent.classList.add('ext__btn--content');
resetBtnContent.textContent = '↺';
resetBtn.appendChild(resetBtnContent);

const standBtn = new Button('ext__btn', 'ext__btn--stand').setText('2 - 6').inject(btnsContainer).button;
const hitBtn = new Button('ext__btn', 'ext__btn--hit').setText('7 - 9').inject(btnsContainer).button;
const splitBtn = new Button('ext__btn', 'ext__btn--split').setText('10 - A').inject(btnsContainer).button;

// State variables
let isDragging = false;
let mouseOffset = { x: 0, y: 0 };

// Listeners
btnsContainer.addEventListener('click', (event) => {
  const target = event.target;

  if (standBtn.contains(target)) console.log('>>> Stand btn clicked!');
  // ~~~ REQUEST ~~~
  else if (hitBtn.contains(target)) console.log('>>> Hit btn clicked!');
  // ~~~ REQUEST ~~~
  else if (splitBtn.contains(target)) console.log('>>> Split btn clicked!');
  // ~~~ REQUEST ~~~
  else if (resetBtn.contains(target)) console.log('>>> Reset btn clicked!');
  // ~~~ REQUEST ~~~
});

// Disable context menu
btnsContainer.addEventListener('contextmenu', function(event) {
  event.preventDefault();
});

// Moving the buttons
btnsContainer.addEventListener("mousedown", (event) => {
  if (event.button === 2) { // Check if right mouse button is pressed
    isDragging = true;
    mouseOffset.x = event.clientX - btnsContainer.getBoundingClientRect().left;
    mouseOffset.y = event.clientY - btnsContainer.getBoundingClientRect().top;
  }
});

btnsContainer.addEventListener("mousemove", (event) => {
  if (isDragging) {
    btnsContainer.style.left = event.clientX - mouseOffset.x + "px";
    btnsContainer.style.top = event.clientY - mouseOffset.y + "px";
  }
});

document.addEventListener("mouseup", () => {
  isDragging = false;
});

btnsContainer.addEventListener("mouseleave", (event) => {
  if (isDragging) {
    btnsContainer.style.left = event.clientX - mouseOffset.x + "px";
    btnsContainer.style.top = event.clientY - mouseOffset.y + "px";
  }
});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Local storage
function saveSettings() {
  localStorage.setItem('bjHackExt', JSON.stringify({
    left: btnsContainer.style.left,
    top: btnsContainer.style.top,
    isHidden: isHidden,
  }));
}

window.addEventListener('beforeunload', saveSettings);
