const hero = document.querySelector('.hero');
const text = document.querySelector('h1');

function shadow(e) {
  // 滑鼠在視窗頁面的位置
  let mouseX = e.clientX;
  let mouseY = e.clientY;
  // 頁面的長寬
  let centerX = window.innerWidth / 2;
  let centerY = window.innerHeight / 2;
  // 計算陰影移動的距離
  let moveX = centerX - mouseX;
  let moveY = centerY - mouseY;

  // 將屬性加入 text-shadow 樣式中
  text.style.textShadow = `
  ${moveX}px ${moveY}px 0 rgb(255, 0, 0),
  ${-moveX}px ${-moveY}px 0 rgb(255, 149, 0),
  ${-moveY}px ${-moveX}px 0 rgb(7, 156, 4),
  ${moveY}px ${moveX}px 0 rgb(0, 179, 255)
  `

}

hero.addEventListener('click', shadow);