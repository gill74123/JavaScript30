const buttons = document.querySelectorAll('.timer__button');
const displayTimeLeft = document.querySelector('.display__time-left');
const displayTimeEnd = document.querySelector('.display__end-time');
const custom = document.querySelector('#custom'); // 表單送出的監聽，指向要用唯一值 id
let countdown;

// 倒數計時器
function timer(seconds) {
  // 先清除之前的倒數循環
  clearInterval(countdown);

  // 抓取現在 & 結束時間
  const nowTime = Date.now(); // 以時間戳的方式呈現
  const endTime = nowTime + seconds * 1000; // 時間戳是使用毫秒，所以要記得將引數 seconds 乘以 1000
  renderTimeLeft(seconds);
  renderEndTime(endTime);

  countdown = setInterval(() => {
    
    // 將結束時間戳 - 目前時間戳 = 我們要倒數的時間，然後再將它轉成秒
    const timeLeft = Math.round((endTime - Date.now()) / 1000);
    // 這邊不能使用 nowTime 要使用 Date.now() 一直重新取得現在的時間才會更新

    // 判斷倒數計時是否 < 0，就要結束每秒更新的循環
    if (timeLeft < 0) {
      clearInterval(countdown);
      return; // 跳出 function
    }

    // 渲染倒數時間
    renderTimeLeft(timeLeft);
  }, 1000);
}

// 渲染倒數時間
function renderTimeLeft(seconds) { // 傳進來的單位是秒
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds - hours * 3600) / 60);
  // 倒數中剩餘的秒數
  const remainderSeconds = seconds % 60;
  
  // 顯示的樣子要調整成電子鐘的形式，數字小於 10 前面要加個 0
  const display = `${hours < 10 ? "0" : ""}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
  displayTimeLeft.textContent = display;
  document.title = display;
}

// 渲染結束時間
function renderEndTime(timestamp) {
  const endDate = new Date(timestamp);
  const hours = endDate.getHours();
  const minutes = endDate.getMinutes();

  // 顯示的樣子要調整成電子鐘的形式，數字小於 10 前面要加個 0
  const display = `Be Back At ${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
  displayTimeEnd.textContent = display;
}

// 預設的倒數時間
function setTime() {
  // 取得點擊按鈕秒數
  const seconds = parseInt(this.dataset.time);
  // 倒數計時
  timer(seconds);
}

// 使用者自行輸入的時間
function setCustomTime(e) {
  e.preventDefault();
  const min = parseInt(this.minutes.value); // minutes 是表單裡面的 input 的 name

  // 完善使用者輸入的防呆
  if ((0 / min) !== 0 || min > 1440) { // 輸入的不是 number 或 大於 24 小時（1440 分鐘）
    // 結束倒數
    clearInterval(countdown);
    // 渲染錯誤訊息
    displayTimeLeft.textContent = (0 / min) !== 0 ? 'Numbers only!' : 'Too long!';
    displayTimeEnd.textContent = '';
    return; // 跳出 function
  }
  timer(min * 60); // 將分鐘轉為秒
  this.reset();
}

// 監聽按鈕事件
buttons.forEach(button => button.addEventListener('click', setTime));
// 監聽表單送出事件
custom.addEventListener('submit', setCustomTime);
