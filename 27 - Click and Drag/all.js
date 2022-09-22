const slider = document.querySelector('.items');
// 是否有按下滑鼠
let isDown = false;

// 按下滑鼠
function mouseFocus() {
  isDown = true;
  slider.classList.add('active');
}

// 鬆開滑鼠、滑鼠離開區域
function mouseUnfocus() {
  isDown = false;
  slider.classList.remove('active');
}

// 拖移滑鼠
function drag(e) {
  // console.dir(e.movementX);
  // console.dir(slider.scrollLeft);
  if (!isDown) return;
  slider.scrollLeft += -(e.movementX);
}

slider.addEventListener('mousedown', mouseFocus);
slider.addEventListener('mouseup', mouseUnfocus);
slider.addEventListener('mouseleave', mouseUnfocus);
slider.addEventListener('mousemove', drag);