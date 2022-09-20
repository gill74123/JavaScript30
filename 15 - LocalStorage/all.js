const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const checkMethod = document.querySelector('.checkMethod');
const itemValue = document.querySelector('[name=item]');
let items = JSON.parse(localStorage.getItem('items')) || []; // 要注意順序

// 新增項目
function addItem(e) {
  e.preventDefault();
  const item = {
    text: itemValue.value,
    done: false
  }
  items.push(item)

  // 寫入 localStorage
  localStorage.setItem('items', JSON.stringify(items));
  // 執行渲染
  renderList(items);
  this.reset();
}

// 渲染畫面
function renderList(items) {
  let str = '';
  items.forEach((item, index) => {
    str += `
        <li>
            <input type="checkbox" id="${index}" ${item.done ? 'checked' : ''}/>
            <label for="${index}">${item.text}</label>
            <span class="deleteItem" data-index="${index}">Delete</span>
        </li>
        `
  });
  itemsList.innerHTML = str;
}

// 修改 checkbox 完成狀態
function toggleDone(e) {
  if (e.target.nodeName !== 'INPUT') return
  const index = e.target.id;
  items[index].done = !items[index].done;
  localStorage.setItem('items', JSON.stringify(items));
}

// 移除項目
function removeItem(e) {
  if (e.target.className === 'deleteItem') { // 移除單一項目
    items.splice(e.target.dataset.index, 1);
    localStorage.setItem('items', JSON.stringify(items));
    renderList(items);
  } else if (e.target.className === 'deleteAll') { // 移除全部項目
    localStorage.removeItem('items');
    items = [];
    renderList(items);
  }
}

// 全選 / 全取消
function checkAll(e) {
  if (e.target.nodeName !== 'INPUT') return
  const checkAllStatus = e.target.checked;
  items.forEach(item => {
    item.done = checkAllStatus;
  })
  localStorage.setItem('items', JSON.stringify(items));
  renderList(items);
}

addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDone);
itemsList.addEventListener('click', removeItem);
checkMethod.addEventListener('click', removeItem);
checkMethod.addEventListener('click', checkAll);
// 初始化渲染
renderList(items);