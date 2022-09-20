const msg = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');
console.log(msg);
// 取得輸入的文字，這邊必須要先取得文字，到了 setOption 的函式是無法取得的
msg.text = document.querySelector('textarea').value;

// 取得語系資訊
function populateVoiceList() {
  voices = this.getVoices();
  console.log(voices);
  // 將取得的語系放入下拉式選單顯示
  voicesDropdown.innerHTML = voices
    .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`);
}

// 設定選擇的語系
function setVoice() {
  msg.voice = voices.find(voice => voice.name === this.value)
  console.log(msg.voice);

  // 只要修改設定就會自動播放，沒有這行的話就要點擊 speakButton 才會播放
  togglePlay();
}

// 開始 / 暫停播放
function togglePlay(isPlay = true) {
  // 先將目前的所有的 SpeechSynthesisUtterance() 都清除
  speechSynthesis.cancel();
  if (isPlay) {
    speechSynthesis.speak(msg);
  }
}

// 設定閱讀選項（Rate, Pitch)
function setOption() {
  // console.log(this.name, this.value);
  msg[this.name] = this.value; // 使用物件取值的方式寫入 msg 物件內

  // 只要修改設定就會自動播放，沒有這行的話就要點擊 speakButton 才會播放
  togglePlay();
}

// 監聽語音清單變更後進行語系清單的更新
speechSynthesis.addEventListener('voiceschanged', populateVoiceList);
// 監聽選到的語系
voicesDropdown.addEventListener('change', setVoice);
// 監聽播放 ＆ 暫停按鈕
speakButton.addEventListener('click', togglePlay);
stopButton.addEventListener('click', () => togglePlay(false));
// 監聽 rate, pitch, 文字的改變
options.forEach(option => option.addEventListener('change', setOption));