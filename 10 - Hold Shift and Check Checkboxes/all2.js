const checkInputs = document.querySelectorAll('.inbox input[type="checkbox"]');
checkInputs.forEach((input) => {
  input.addEventListener('click', holdingShiftCheck)
})

// 點擊勾選 & 點擊取消
let click;
let selectClick;
let cancelClick;

function holdingShiftCheck(e) {
  // shift + 點擊勾選
  if (e.shiftKey && this.checked) {
    selectClick = this;
    select();
  } else if (this.checked) {
    // 單純點擊
    click = this;
    // selectClick = undefined;
    // cancelClick = undefined;
}
}

// 選取
function select() {
  let isBetween = false;
  checkInputs.forEach((input) => {
    if (input === selectClick || input === click) {
      // 預設皆為 false 將還沒有被勾選的轉換成 true，反之轉換成 false
      isBetween = !isBetween;
    }

    // 判斷點擊的兩個 checkbox 中間是否有未點擊的
    if (isBetween && click !== undefined && click !== selectClick) {
      input.checked = true;
    }
  })

}

window.addEventListener('keyup', (e) => {
  if (e.keyCode === 16 || e.shiftKey) {
    click = undefined;
  };
})