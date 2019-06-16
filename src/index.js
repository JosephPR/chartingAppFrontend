/* quandi api key: xX6McQAvBk9CJ4zh7REH */

// addBtn.addEventListener('click', () => {
  //   addChart = !addChart
  //   if (addChart) {
    //     chartForm.style.display ='block'
    //   } else {
      //     chartForm.style.display = 'none'
      //   }
      // })
let addChart = false
const addBtn = document.querySelector('#new-chart-btn')
const chartForm = document.querySelector('.container')
const chartUrl = 'http://localhost:3000/charts'
const chartCollectionDiv = document.getElementById('chart-collection')
//add charts to page
const parseJSON = response => response.json()
//new chart submission
const addChartForm = document.querySelector('.add-chart-form');


function putChartOnPage(charts){
  charts.forEach(function (chart) {
    chartCollectionDiv.innerHTML += `
    <div class="card" data-id=${chart.id}>
    <h2>${chart.name}</h2>
    <img style="width: 70%" src="${chart.image}" class="chart-avatar">
    <h4> RSI: ${chart.rsi}</h4>
    </div>
    <hr>`
  })
};

fetch(chartUrl)
  .then(parseJSON)
  .then(putChartOnPage)

addChartForm.addEventListener('submit', function (event) {
  event.preventDefault();


  fetch(chartUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "name": `${event.target.name.value}`,
      "image": `${event.target.image.value}`,
      "rsi": `${event.target.rsi.value}`
    })
  })
    .then(parseJSON)
    .then(putChartOnPage)
  //making the request based on the input
  //putting the info on the page by creating a new div card and putting that new chart's name, image and rsi there on the page and appending it to chartCollectionDiv
})
