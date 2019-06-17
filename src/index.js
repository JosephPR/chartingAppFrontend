/* quandi api key: xX6McQAvBk9CJ4zh7REH */


let addChart = false
const addBtn = document.querySelector('#new-chart-btn')
const chartForm = document.querySelector('.container')
const chartUrl = 'http://localhost:3000/charts'
const chartCollectionDiv = document.getElementById('chart-collection')
//add charts to page
const parseJSON = response => response.json()
//new chart submission
const addChartForm = document.querySelector('.add-chart-form');
const date = moment().format('MMMM Do YYYY, h:mm a')
const time = document.querySelector('.time').innerHTML = date

function putChartOnPage(charts){
  charts.forEach(function (chart) {
    chartCollectionDiv.innerHTML += `
    <div class="card" data-id=${chart.id}>
    <img style="width: 70%" src="${chart.image}" class="chart-avatar">
    <h1>${chart.name}</h1>
    <h4> RSI: ${chart.rsi}</h4>
    <h4> Target: ${chart.target}</h4>
    <h4> Market Cap: ${chart.market}</h4>
    <h4> concensus: ${chart.rating}</h4>

    </div>
    <hr>`
  })
};

fetch(chartUrl)
  .then(parseJSON)
  .then(putChartOnPage)

addChartForm.addEventListener('submit', function (event) {
  // event.preventDefault();
  // changeInputColor(addChartForm, `${chart.rsi}`)

  fetch(chartUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "name": `${event.target.name.value}`,
      "image": `${event.target.image.value}`,
      "rsi": `${event.target.rsi.value}`,
      "target": `${event.target.target.value}`,
      "market": `${event.target.market.value}`,
      "rating": `${event.target.rating.value}`
    })
  })
    .then(parseJSON)
    .then(putChartOnPage)
});

// bideo stuff

var video = document.querySelector('video')
  , container = document.querySelector('#container');

var setVideoDimensions = function () {
  // Video's intrinsic dimensions
  var w = video.videoWidth
    , h = video.videoHeight;

  var videoRatio = (w / h).toFixed(2);

  var containerStyles = window.getComputedStyle(container)
    , minW = parseInt( containerStyles.getPropertyValue('width') )
    , minH = parseInt( containerStyles.getPropertyValue('height') );

  var widthRatio = minW / w
    , heightRatio = minH / h;

  if (widthRatio > heightRatio) {
    var newWidth = minW;
    var newHeight = Math.ceil( newWidth / videoRatio );
  }
  else {
    var newHeight = minH;
    var newWidth = Math.ceil( newHeight * videoRatio );
  }

  video.style.width = newWidth + 'px';
  video.style.height = newHeight + 'px';
};

video.addEventListener('loadedmetadata', setVideoDimensions, false);
window.addEventListener('resize', setVideoDimensions, false);
