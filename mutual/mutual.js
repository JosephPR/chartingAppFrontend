const mutualUrl = `https://api.worldtradingdata.com/api/v1/mutualfund?symbol=FSPTX,FSELX,FSENX&api_token=${api_key}`

const stocks =  document.querySelector('.stocks')
const date = moment().format('MMMM Do YYYY, h:mm a')
const time = document.querySelector('.time').innerHTML = date
let data

function getMutual() {
  return fetch(mutualUrl)
  .then(response => response.json())
  .then(response => {
    // console.log(response)
    data = response
  })
  .then(stockName)
}

getMutual()
//we need the to interpolate the date aswell
function stockName() {
  data.data.map(chart => {

    stocks.innerHTML += `
    <div class="card">
    <h2><a class="chart-name" href="https://www.tradingview.com/symbols/${chart.symbol}/">${chart.symbol}</a></h2>
    <br>

    <h3>Name: ${chart.name}</h3>
    <br>
    <h3>Price: ${chart.price}</h3>
    <br>
    <h3>Close Yesterday: ${chart.close_yesterday}</h3>
    <br>
    <h3>52 Week Return: ${chart.return_52week}%</h3>
    <br>
    <h3>Dividend: ${chart.income_dividend}</h3>
    <br>
    <hr>`
  })
}
