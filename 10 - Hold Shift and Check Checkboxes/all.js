const checkInputs = document.querySelectorAll('.inbox input[type="checkbox"]');
checkInputs.forEach((input) => {
  input.addEventListener('click', holdingShiftCheck)
})

let lastChecked;
let isBetween = false;
let cancelClick = false;

function holdingShiftCheck(e) {
  if (e.shiftKey && this.checked) {
    checkInputs.forEach((input, index) => {
      if (input === this || input === lastChecked) {
        // isBetween 預設為 false 把 isBetween 開啟和關閉（第一次碰到開啟，第二次碰到關閉）
        isBetween = !isBetween;
      }

      // 判斷點擊的兩個 checkbox 中間是否有未點擊的
      if (isBetween) {
        input.checked = true;
      }
    })
  }

  // 紀錄最後一個點擊的 checkbox，最後一個點擊的會是下一次的第一次點擊
  if (e.target.checked) {
    lastChecked = this;
  }

  if (e.shiftKey && !this.checked) {
    checkInputs.forEach((input, index) => {
      if (input === this || input === lastCancelChecked) {
        // isBetween 預設為 false 把 isBetween 開啟和關閉（第一次碰到開啟，第二次碰到關閉）
        cancelClick = !cancelClick;
      }

      // 判斷點擊的兩個 checkbox 中間是否有未點擊的
      if (cancelClick) {
        input.checked = false;
      }
    })
  }

  
  if (!e.target.checked) {
    lastCancelChecked = this;
  }
}