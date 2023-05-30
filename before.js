// This code will be executed before page load

const defaultSettings = {
  defaultContainerPosX: '500px',
  defaultContainerPosY: '500px',
}

const localSettings = JSON.parse(localStorage.getItem('bjHackExt'));
console.log('loaded settings:', localSettings);

let btnsContainerPosX = localSettings.left ? localSettings.left : defaultContainerPosX;
let btnsContainerPosY = localSettings.top ? localSettings.top : defaultContainerPosY;
let isHidden = localSettings.isHidden === false ? false : true;
