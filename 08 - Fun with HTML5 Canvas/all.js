// 創造畫布，將畫布的寬高設定成裝置大小
const canvas = document.querySelector('#draw');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 色彩變數
let hue = 0;

// 線條粗細變數
let width = 100;
let widthVariable = 1;

// 設定畫布方法
const ctx = canvas.getContext('2d');
let startX = 0;
let startY = 0;
ctx.lineCap = 'round';
ctx.lineJoin = 'round';

canvas.addEventListener('mousedown', clickMouse);
function clickMouse (e) {
  // 滑鼠按下去的位置 (= 起始位置)
  startX = e.offsetX;
  startY = e.offsetY;
  console.log(e.offsetX, e.clientX);
  canvas.addEventListener('mousemove', draw);
}

function draw (e) {
  // 開始繪畫
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(e.offsetX,e.offsetY);
  ctx.stroke();

  // 紀錄線條的最後作標
  // 原本線條的終點作為下一線條的起點
  startX = e.offsetX;
  startY = e.offsetY;

  

  // 改變色彩
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  if (hue >= 360) {
    hue = 0
  } else if (hue > -1) {
    hue++;
  }

  // 改變粗細
  ctx.lineWidth = width;
  if (width >= 100 || width <= 1) {
    widthVariable = - widthVariable;
  }
  width += widthVariable;
}

// 移除監聽
// 在 mouseup 的時候將 mousemove 執行的 draw 函式移除
canvas.addEventListener('mouseup', removeMouse);
function removeMouse () {
  canvas.removeEventListener('mousemove', draw);
}