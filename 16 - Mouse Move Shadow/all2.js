// 有範圍的移動方法

const hero = document.querySelector('.hero');
const text = document.querySelector('h1');
// 基準移動值
const walk = 500; // 500px

function shadow(e) {
  // 滑鼠在視窗頁面的位置
  let mouseX = e.clientX;
  let mouseY = e.clientY;
  // 頁面的長寬
  let windowX = window.innerWidth;
  let windowY = window.innerHeight;
  // 計算陰影移動的距離
  let moveX = Math.round((mouseX / windowX * walk)- (walk / 2));
  let moveY = Math.round((mouseY / windowY * walk)- (walk / 2));
  
  // 將屬性加入 text-shadow 樣式中
  text.style.textShadow = `
  ${moveX}px ${moveY}px 0 rgb(255, 0, 0),
  ${-moveX}px ${-moveY}px 0 rgb(255, 149, 0),
  ${-moveY}px ${-moveX}px 0 rgb(7, 156, 4),
  ${moveY}px ${moveX}px 0 rgb(0, 179, 255)
  `
}

hero.addEventListener('mousemove', shadow);