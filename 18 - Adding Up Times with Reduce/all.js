const allTimes = [...document.querySelectorAll('[data-time]')];

// 將資料彙整
// const secondsTimes = allTimes.map(time => {
//     // 將字串切割(返回陣列)
//     const timeArray = time.dataset.time.split(':');
//     // 將時間做轉換 & 字串轉數字，返回值
//     return parseFloat(timeArray[0]) * 60 + parseFloat(timeArray[1]);
// })

// 累加
// const totalTimes = secondsTimes.reduce((total, timeItem) => {
//     return total + timeItem;
// })

// 將 map & reduce 方法合併
const totalTimes = allTimes.reduce((acc, cv) => {
    // 將字串切割(返回陣列)
    const timeArray = cv.dataset.time.split(':');
    // 將時間做轉換 & 字串轉數字，返回值
    const seconds = parseFloat(timeArray[0]) * 60 + parseFloat(timeArray[1]);
    // 累加
    return acc + seconds;
}, 0)

// 時間轉換
const hours = Math.floor(totalTimes / 3600);
const mins = Math.floor((totalTimes % 3600) / 60);
const sec = totalTimes % 60;
console.log(`總時長 → ${hours} : ${mins} : ${sec}`);
