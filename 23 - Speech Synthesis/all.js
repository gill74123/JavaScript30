const msg = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');
// 取得輸入的文字
console.log(msg);
msg.text = document.querySelector('textarea').value;

// 取得語系資訊
function populateVoiceList() {
  voices = this.getVoices();
  console.log(voices);
  // 將取得的語系放入下拉式選單
  voicesDropdown.innerHTML = voices
  .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`);
}

// 設定選擇的語系
function setVoice() {
  msg.voice = voices.find(voice => voice.name === this.value)
  console.log(msg.voice);
}


// 監聽語音清單變更後進行語系清單的更新
speechSynthesis.addEventListener('voiceschanged', populateVoiceList);
// 監聽選到的語系
voicesDropdown.addEventListener('change', setVoice)