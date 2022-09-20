const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const searchInput = document.querySelector('.search');
const suggestionsArea = document.querySelector('.suggestions');
let data = [];
let searchData = [];
let searchValue = '';

searchInput.addEventListener('keyup', matches);
function matches() {
  searchValue = searchInput.value.trim().toLowerCase();
  axios.get(endpoint)
    .then((res) => {
      data = res.data;
      searchData = data.filter((item) => {
        let dataCity = item.city.trim().toLowerCase();
        let dataState = item.state.trim().toLowerCase();
        return dataCity.match(searchValue) || dataState.match(searchValue);
      })

      // 執行 渲染畫面
      showData();
    })
    .catch((err) => {
      console.log(err);
    })
};

function showData() {
  let str = "";
  // 正規式表達的搜尋值，不分大小寫
  const regex = new RegExp(searchValue, 'gi');
  searchData.forEach((item) => {
    const cityName = item.city.replace(regex, `<span class="hl">${searchValue}</span>`);
    const stateName = item.state.replace(regex, `<span class="hl">${searchValue}</span>`);
    const population = item.population.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    str += `
    <li>
      <span>${cityName}, ${stateName}</span>
      <span class="population">${population}</span>
    </li>`;
  })
  suggestionsArea.innerHTML = str;
};