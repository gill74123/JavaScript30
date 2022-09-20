// 第一個想到的做法
const spacingInput = document.querySelector('#spacing');
const blurInput = document.querySelector('#blur');
const baseInput = document.querySelector('#base');
const hl = document.querySelector('.hl');
const image = document.querySelector('img');

function spacing() {  
  image.style.padding = `${spacingInput.value}px`;
}

function blur() {
  image.style.filter = `blur(${blurInput.value}px)`;
}

function base() {
  image.style.background = `${baseInput.value}`;
  hl.style.color = `${baseInput.value}`;
}

spacingInput.addEventListener('change', spacing);
blurInput.addEventListener('change', blur);
baseInput.addEventListener('change', base)