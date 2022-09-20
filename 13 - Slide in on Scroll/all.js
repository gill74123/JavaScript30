function debounce(func, wait = 20, immediate = true) {
  var timeout;
  return function () {
    var context = this, args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

const images = document.querySelectorAll('.slide-in');

window.addEventListener('scroll', checkImage);
function checkImage() {
  images.forEach(image => {
    // 條件一
    // 取得視窗底部(滾輪垂直移動高度 + 視窗高度)
    const slideBottom = window.scrollY + window.innerHeight;
    // 圖片 1/2 的位置(圖片與父層的距離 + 圖片本身高度的 1/2)
    const imageHalfPosition = image.offsetTop + image.offsetHeight /2;
    // 只要視窗底部的位置超過(>)圖片一半的位置 -> true
    const imageAppear = slideBottom >= imageHalfPosition;

    // 條件二
    // 圖片底部位置(圖片與父層的距離 + 圖片本身高度)
    const imageBottom = image.offsetTop + image.offsetHeight;
    // 滾輪滑動的幅度超過(>)圖片底部的位置(整張圖不在視窗中了) -> true
    const imageOnWindow = window.scrollY < imageBottom;

    if (imageAppear && imageOnWindow) {
      image.classList.add('active');
    } else {
      image.classList.remove('active');
    }
  })
}