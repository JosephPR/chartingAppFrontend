// const pokiUrl = 'https://pokeapi.co/api/v2/pokemon'
// const swapiUrl = 'https://swapi.co/api/people'


// to change symbols put this url in a function so it waits till the function is called
let marketUrl = `https://api.worldtradingdata.com/api/v1/stock?symbol=BIO,VRTX,GILD,INCY,ALXN&api_token=${api_key}`
// const potterUrl = 'http://hp-api.herokuapp.com/api/characters'

const stocks =  document.querySelector('.stocks')
const date = moment().format('MMMM Do YYYY, h:mm a')
const time = document.querySelector('.time').innerHTML = date
let data

function getFavorites() {
  return fetch(marketUrl)
  .then(response => response.json())
  .then(response => {
    console.log(response)
    data = response
  })
  .then(stockName)
}
getFavorites()

function stockName() {
  data.data.map(stock => {
    stocks.innerHTML += `
    <div class="card">
    <h2><a class="chart-name" href="https://www.tradingview.com/symbols/${stock.symbol}/">${stock.symbol}</a></h2>
    <br>
    <h3>Company: ${stock.name}</h3>
    <br>
    <h3>Close: ${stock.price}</h3>
    <br>
    <h3>HOD: ${stock.day_high}</h3>
    <br>
    <h3>LOD: ${stock.day_low}</h3>
    <br>
    <h3>Price at open: ${stock.price_open}</h3>
    <br>
    <h3>Yesterday's close:  ${stock.close_yesterday}</h3>
    <br>
    <h3>Exchange:  ${stock.stock_exchange_short}</h3>
    <br>
    <hr>`
  })
}
