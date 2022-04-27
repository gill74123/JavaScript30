const keyArray = document.querySelectorAll('.key');

function playSound(e) {
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  const key = document.querySelector(`.key[data-key="${e.keyCode}"]`)
  audio.currentTime = 0;
  audio.play();
  key.classList.add('playing');
}

function removeProperty(e) {
  // 判斷 transition 相關 CSS 屬性是否存在
  if (e.propertyName !== "transform") return;
  keyArray.forEach(item => {
    item.classList.remove('playing');
  })
}

function clickPaly(e) {
  e.path.forEach(item => {
    if (item.dataset === undefined) return;
    if (item.dataset.key) {
      const audio = document.querySelector(`audio[data-key="${item.dataset.key}"]`);
      audio.currentTime = 0;
      audio.play();
      item.classList.add('playing');
    } else {
      return
    }
  })
}

window.addEventListener('keydown', playSound)
window.addEventListener('click', clickPaly)
keyArray.forEach(item => {
  item.addEventListener('transitionend', removeProperty)
})