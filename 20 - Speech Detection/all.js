// 將全域環境中的 SpeechRecognition 指向好
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
// 建立變數來是別語音功能及相關功能
const recognition = new SpeechRecognition();
// console.dir(recognition);
recognition.lang = 'cmn-Hant-TW'; // 設定語言，這邊是中文
recognition.interimResults = false; // 若要即時提供結果就設定為 true，false 則是整句話說完後才提供結果

// 設定輸出區域
let p = document.createElement('p');
const words = document.querySelector('.words');
words.appendChild(p);

recognition.addEventListener('result', e => {
  // console.log(e.results);
  // const transcript = e.results[0][0].transcript; // 若只要取用 transcript 的資料可以是用此方法
  const transcript = Array.from(e.results)
    .map(result => result[0])
    .map(result => result.transcript)
    .join('');

  // 將特定的字顯示指定的符號
  let myScript = transcript.replace(/我|你|他/gi, '👧');
  p.textContent = myScript;

  // 會發現每一次的辨識都會重複覆蓋前一次的文字
  // 所以當結束一次時(e.results[0].isFinal === true)，就會再新增一個 p，讓下一次辨識輸入
  if (e.results[0].isFinal === true) {
    p = document.createElement('p');
    words.appendChild(p);
  }
})

// 當 e.results[0].isFinal === true 會停止辨識
// 也就是他無法連續辨識，辨識完第一次就會停止，需重新刷新才可以再辨識
recognition.addEventListener('end', recognition.start);

// 執行語音辨識
recognition.start();