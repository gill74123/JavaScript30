const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');
console.dir(video)

// 定義要取得的影音內容
let constraints = {
  audio: true,
  video: true
}
// 請求開啟影音裝置
navigator.mediaDevices.getUserMedia(constraints)
  .then((mediaStream) => {
    // mediaStream 是一個 API 產生的媒體流(影像)
    // 將此影像賦予給 video 元素的 src 屬性
    video.srcObject = mediaStream;
    // 播放(將影像顯示在畫面上)
    video.play();
  })
  .catch((err) => {
    console.log(err);
  })

  // 將畫面放置畫布
function paintToCanvas() {
  // 設定畫布
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  // 需重複執行，使用 setInterval，不然只會有一張靜態圖像
  return setInterval(() => {
    // 將影像顯示在畫布上
    ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

    // 製作效果
    // 取得畫布的圖像的資訊
    let pixels = ctx.getImageData(0, 0, video.videoWidth, video.videoHeight);
    pixels = rgbSplit(pixels);
    // 將加上效果的圖像寫回去畫布
    ctx.putImageData(pixels, 0, 0);
  }, 16)
}

// 濾鏡效果
function rgbSplit(pixels) {
  // 透過迴圈將取回的所有像素資料跑一次，i +=4 是因為四個一組(r,g,b,alpha）
  for (let i = 0; i < pixels.data.length; i+=4) {
    pixels.data[i - 150] = pixels.data[i + 0]; // RED
    pixels.data[i + 500] = pixels.data[i + 1]; // GREEN
    pixels.data[i - 550] = pixels.data[i + 2]; // Blue
  }
  return pixels;
}

// 拍照功能
function takePhoto() {
  // 播放音效
  // 使他可以連續播放音效
  snap.currentTime = 0; 
  snap.play();

  // 取得圖像
  // 創造圖像連結
  const dataUrl = canvas.toDataURL();
  // 指向用 JS 新增的 a 元素，並配置其屬性
  const link = document.createElement('a');
  link.href = dataUrl;
  link.setAttribute('download', 'photo');
  link.innerHTML = `<img src="${dataUrl}" alt="photo">`;
  strip.insertBefore(link, strip.firstChild);
}

video.addEventListener('canplay', paintToCanvas);
