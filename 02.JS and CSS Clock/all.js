// 指向 DOM
const hourHand = document.querySelector('.hour-hand');
const minHand = document.querySelector('.min-hand');
const secondHand = document.querySelector('.second-hand');

function setClock() {
  // 抓取現在時間
  let date = new Date();
  const hour = date.getHours();
  const min = date.getMinutes();
  const sec = date.getSeconds();

  // 設定時鐘角度
  // (min / 60 * 30), (sec / 60 * 6)，分針、時針會隨著秒針及分針前進而有些許移動
  // 因為指針一開始的位置是在 9 的位置，+ 90 度讓他從 12 開始
  const hourAngle = ((hour * 360 / 12) + (min / 60 * 30)) + 90;
  const minAngle = ((min * 360 / 60) + (sec / 60 * 6)) + 90;
  const secAngle = (sec * 360 / 60) + 90;

  hourHand.style.transform = `rotate(${hourAngle}deg)`
  minHand.style.transform = `rotate(${minAngle}deg)`
  secondHand.style.transform = `rotate(${secAngle}deg)`
}

setClock();
// 每秒抓取時間並更新畫面
setInterval(setClock, 1000)