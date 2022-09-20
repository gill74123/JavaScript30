const panels = document.querySelectorAll('.panel');

// 兩個特效同時觸發
panels.forEach(panel => {
    panel.addEventListener('click', togglePanel);
})
function togglePanel() {
    this.classList.toggle('open')
}

// 先放大中間文字，上下再飛入文字
panels.forEach(panel => {
    panel.addEventListener('transitionend', activePanel);
})
function activePanel(e) {
    // 有兩個 CSS 做變動：flex-grow, font-size，所以抓取 flex-grow 做變動就加入 active
    if(e.propertyName !== 'flex-grow') return;
    this.classList.toggle('active');
}