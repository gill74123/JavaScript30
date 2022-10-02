const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
const startBtn = document.querySelector('.startBtn');

// 記錄前一次隨機出現的地洞是哪一個
let lastHole;
// 記錄遊戲是否結束
let isTimeUp = false;

// 地鼠 隨機洞穴函式
function randomHole() {
  let index = Math.floor(Math.random() * holes.length)
  // console.log(index);
  // 取得現在是哪一個 hole
  const hole = holes[index];

  // 判斷現在隨機的 hole 是否與前一個（lastHole）相同
  if (hole === lastHole) {
    // 如果是同一個，就在執行一次此 function（迴圈的概念）
    return randomHole();
  }
  // 不管是否與前一個相同都要將現在的 hole 賦予給 lastHole 這樣下一次才可以做比較
  lastHole = hole;
  return hole;
}

// 地鼠 隨機時間函式
function randomTime(min, max) {
  // 可以自己設定時間的最大與最小值，Math.round 會四捨五入到個位數
  const time = Math.round(Math.random() * (max - min) + min);
  return time;
}

// 讓地鼠渲染出現在畫面上
function peep() {
  // 取得地鼠出現的地洞 & 時間
  const time = randomTime(300, 1000); // 單位為毫秒
  const hole = randomHole();
  // console.log(hole);

  // 讓地鼠真正出現的語法加到 .hole 內（藏在 CSS 的 .up 中）
  hole.classList.add('up');

  // 需要在遊戲結束前地鼠要不停地出現
  setTimeout(() => {
    hole.classList.remove('up');
    if (!isTimeUp) {
      peep();
    }
  }, time);
}

// 開始 & 結束 遊戲函式
function startGame(e) {
  e.preventDefault();
  
  // 開始遊戲：地鼠出現
  peep();
  isTimeUp = false;
  
  // 分數歸零
  scoreBoard.textContent = 0;

  // 結束遊戲：自己設定結束時間
  setTimeout(() => {
    // 當 isTimeUp === true 時，peep 會停止執行
    isTimeUp = true;
  }, 10000); // 設定 10 秒結束遊戲
}

// 監聽點擊地鼠並更新分數的函式
function scoreUpdate(e) {
  // 判斷使用者是否用滑鼠點擊
  if (!e.isTrusted) return;

  // 取得當前分數
  let score = parseInt(scoreBoard.textContent);
  score++;
  scoreBoard.textContent = score;

  // 點擊到地鼠時就算他的出現時間還沒結束也要消失
  this.classList.remove('up');
}

// 監聽點擊遊戲開始事件
startBtn.addEventListener('click', startGame);
// 監聽點擊地鼠事件
moles.forEach(mole => mole.addEventListener('click', scoreUpdate));
