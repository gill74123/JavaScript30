// 播放器
const video = document.querySelector('.player__video');
// 播放 / 暫停
const playToggle = document.querySelector('.player__button.toggle');
// 進度條
const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.progress__filled')
// 音量調節 / 速度調節
const playSlider = document.querySelectorAll('.player__slider');
// 快進 / 快退
const playSkip = document.querySelectorAll('[data-skip]');
// 全螢幕
const fullScreen = document.querySelector('.fullScreen');

// 影片播放 / 暫停
video.addEventListener('click', togglePlay);
playToggle.addEventListener('click', togglePlay);
function togglePlay() {
  if (video.paused) {
    video.play();
    playToggle.innerHTML = '❚ ❚';
  } else {
    video.pause();
    playToggle.innerHTML = '►';
  }
}

// 音量 / 速度調節
playSlider.forEach(range => {
  range.addEventListener('change', changeSlider);
  range.addEventListener('mousemove', changeSlider);
})
function changeSlider(e) {
  if (e.target.name === 'volume') { // 音量調節
    video.volume = e.target.value;
  } else { // 速度調節
    video.playbackRate = e.target.value;
  }
}

// 快進 / 快退
playSkip.forEach(range => {
  range.addEventListener('click', skip);
})
function skip(e) {
  video.currentTime += parseInt(e.target.dataset.skip);
}

// 影片進度條顯示
video.addEventListener('progress', videoProgress);
function videoProgress() {
  const progressPercent = (video.currentTime / video.duration) * 100;
  progressBar.style.setProperty('flex-basis', `${progressPercent}%`);
}

// 影片進度條操作
let clicked = false;
// 把事件寫成一個陣列跑迴圈，就不用寫四個監聽
const progressEvents = ['click', 'mousemove', 'mousedown', 'mouseup'];
progressEvents.forEach(progressEvent => {
  progress.addEventListener(progressEvent, changeProgress)
})
function changeProgress(e) {
  if (e.type === 'mousedown') { clicked = true; }
  if (e.type === 'mouseup') { clicked = false; }
  if ((e.type === 'mousemove' && clicked) || e.type === 'click') {
    const updateTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = updateTime;
  }
}

// 全螢幕
fullScreen.addEventListener('click', goFullScreen);
function goFullScreen() {
  if (video.requestFullscreen) {
    video.requestFullscreen();
  } else if (video.msRequestFullscreen) {
    video.msRequestFullscreen();
  } else if (video.mozRequestFullScreen) {
    video.mozRequestFullScreen();
  } else if (video.webkitRequestFullscreen) {
    video.webkitRequestFullscreen();
  }
}

// 鍵盤操作 播放 / 暫停、快進 / 快退
window.addEventListener('keydown', keyboardFunction);
function keyboardFunction(e) {
  if (e.keyCode === 32) {
    togglePlay();
  } else if (e.keyCode === 39) {
    const nextBtn = document.querySelector("[data-skip='25']");
    nextBtn.click();
    // playSkip.forEach(btn => {
    //   if (btn.dataset.skip === '25') {
    //     btn.click();
    //   }
    // })
  } else if (e.keyCode === 37) {
    const backBtn = document.querySelector("[data-skip='-10']");
    backBtn.click();
    // playSkip.forEach(btn => {
    //   if (btn.dataset.skip === '-10') {
    //     btn.click();
    //   }
    // })
  }
}