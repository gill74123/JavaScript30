const checkInputs = [...document.querySelectorAll('.inbox input[type="checkbox"]')];
checkInputs.forEach((input) => {
  input.addEventListener('click', check)
})

let click ; // 單純勾選 / 取消
let shiftClick; // 加上 shift 勾選
let shiftCancelClick; // 加上 shift 取消

function check(e) {
  if (e.shiftKey && this.checked) { // 加上 shift 勾選
    shiftClick = this;
    selectBetween();
  } else if (e.shiftKey && !this.checked) { // 加上 shift 取消
    shiftCancelClick = this;
    cancelBetween();
  } else if (this.checked) { // 單純勾選
    click = this;
  } else if (!this.checked) { // 單純取消
    click = this;
  }
}

function selectBetween () {
  let checkIndex = checkInputs.indexOf(click);
  let shiftClickIndex = checkInputs.indexOf(shiftClick);
  checkInputs.forEach((input, index) => {
    if (checkIndex === -1) return; // 排除第一次按 shift 勾選時全選
    if ((index >= checkIndex && index <= shiftClickIndex) || (index <= checkIndex && index >= shiftClickIndex)) {
      input.checked = true;
    }
  })

  // 紀錄最後一個點擊的 checkInput，最後一個點擊的會是下一次要按 shift 的的第一次點擊
  click = shiftClick;
}

function cancelBetween () {
  console.log(click);
  let checkIndex = checkInputs.indexOf(click);
  let shiftCancelClickIndex = checkInputs.indexOf(shiftCancelClick);
  checkInputs.forEach((input, index) => {
    if ((index >= checkIndex && index <= shiftCancelClickIndex) || (index <= checkIndex && index >= shiftCancelClickIndex)) {
      input.checked = false;
    }
  })

  // 紀錄最後一個點擊的 checkInput，最後一個點擊的會是下一次要按 shift 的第一次點擊
  click = shiftCancelClick;
}

// 偵測當 shift 放開時讓 click 恢復未選取的狀態
window.addEventListener('keyup', (e) => {
  if (e.shiftKey) {
      click = undefined;
  };
})