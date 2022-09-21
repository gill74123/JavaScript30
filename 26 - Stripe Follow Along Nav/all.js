const triggers = document.querySelectorAll('.cool li');
const background = document.querySelector('.dropdownBackground');
const nav = document.querySelector('.top');

function handleEnter() {
  this.classList.add('trigger-enter');
  setTimeout(() => {
    if (this.classList.contains('trigger-enter')) {
      this.classList.add('trigger-enter-active');
    }
    background.classList.add('open');
  }, 150);

  // 取得觸發 li 元素底下的 .dropdown 子元素
  const dropdown = this.querySelector('.dropdown');
  // 取得該子元素的大小 ＆ 位置資料
  const dropdownCoords = dropdown.getBoundingClientRect();
  // 取得 nav 元素的大小 ＆ 位置資料
  const navCoords = nav.getBoundingClientRect();
  // console.log(dropdownCoords);

  // dropdown 上方還有 nav 的元素，所以要扣掉該元素的 top & left，背景的位置才不會歪掉
  const coords = {
    top: dropdownCoords.top - navCoords.top,
    left: dropdownCoords.left - navCoords.left
  }

  background.style.width = `${dropdownCoords.width}px`;
  background.style.height = `${dropdownCoords.height}px`;
  background.style.transform = `translate(${coords.left}px, ${coords.top}px)`;
}

function handleLeave() {
  this.classList.remove('trigger-enter', 'trigger-enter-active');
  background.classList.remove('open');
}


triggers.forEach(trigger => trigger.addEventListener('mouseenter', handleEnter));
triggers.forEach(trigger => trigger.addEventListener('mouseleave', handleLeave));