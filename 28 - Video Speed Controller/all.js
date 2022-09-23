const speed = document.querySelector('.speed');
const speedBar = document.querySelector('.speed-bar');
const video = document.querySelector('.flex');

function handleRate(e) {
  // console.dir(e);
  // console.dir(this);

  // 計算當下滑鼠的位置佔整個 speed 的比例
  const percent = e.offsetY / this.offsetHeight;
  // 使用佔比設定給 speedBar 的樣式高度（這樣就會有顏色）
  const height = Math.round(percent * 100);
  speedBar.style.height = height + '%';

  // 設定播放速度（最小 0.4, 最大 4）
  const min = 0.4;
  const max = 4;
  // 用滑鼠的佔比 * 設定最大最小的距離 + 開頭為 min 0.4
  const playRate = percent * (max - min) + min;
  // 將數字寫進 speedBar 中
  speedBar.textContent = playRate.toFixed(2) + 'x';

  // 將播放速度設定給 video
  video.playbackRate = playRate;
}

// 監聽滑鼠移動事件
speed.addEventListener('mousemove', handleRate);