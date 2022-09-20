const keyWord = document.querySelectorAll('a');
// 建立一個 highlight 效果的 span
const highlight = document.createElement('span');
// 將預設的樣式加入此 highlight
highlight.classList.add('highlight');
// 將建立的 highlight 加入到頁面中
document.body.appendChild(highlight);

function highlightLink() {
  const linkCoords = this.getBoundingClientRect();
  // getBoundingClientRect 載入的元素位置時資訊已經固定，所以當滾動卷軸時並不會自動更新
  // 所以需要在座標上加入滾動的 X Y 軸位置(元素的長寬不會變，所以就照取得的資訊即可)
  const coords = {
    width: linkCoords.width,
    height: linkCoords.height,
    top: linkCoords.top + window.scrollY,
    left: linkCoords.left + window.scrollX
  }

  // 將取得的長寬與座標，給到 highlight
  highlight.style.width = `${coords.width}px`;
  highlight.style.height = `${coords.height}px`;
  highlight.style.transform = `translate(${coords.left}px, ${coords.top}px)`;
}

// 監聽滑鼠移動到元素事件
keyWord.forEach(a => {
  a.addEventListener('mouseenter', highlightLink);
})
