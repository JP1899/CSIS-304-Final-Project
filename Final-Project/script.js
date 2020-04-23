

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', sendLocation);

// if enter key is pressed, call getResults function
function sendLocation(event)
{
    if (event.keyCode == 13)
    {
        getResults(searchbox.value);
        console.log(searchbox.value);
    }
}

// function takes value user enters in text box
// and seaches API to get back JSON results for temp, weather, etc.
// TODO ??need to convert the text to JSON??
function getResults(textboxValue)
{
    console.log("Load the data via ajax");

    //Make the ajax request
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/weather?q=" + textboxValue + "&units=imperial&APPID=46a12c94ae0536aadb76d326ffa08d91",
        type: "GET", //HTTP method
        dataType: "json", //The data recieved
        success: displayResults, //on success, show all the data
    });
}


// take JSON data givven to function and assign it to correct spot on webpage
function displayResults(weather)
{

    for (i in weather)
    {
        //console.log(i);
        //console.log(weather.name);
        var cityName = document.querySelector('.location .city');
        cityName.innerText = `${weather.name}, ${weather.sys.country}`; //https://www.youtube.com/watch?v=Re2FAmbNV8g&t=198s

        var temp = document.querySelector('.current .temp');
        temp.innerText = `${Math.floor(weather.main.temp)}°F`;
        //temp.append(Math.floor(weather.main.temp) + "°F");

        var currWeather = document.querySelector('.current .weather');
        currWeather.innerText = weather.weather[0].description;

        var hi_low = document.querySelector('.hi_low');
        hi_low.innerText = `${Math.floor(weather.main.temp_min)}°F / ${Math.floor(weather.main.temp_max)}°F`;

        var humidity = document.querySelector('.humidity');
        humidity.innerText = `Humidity: ${weather.main.humidity}%`;

        let currentDate = new Date();
        let date = document.querySelector('.location .date');
        date.innerText = getDate(currentDate);
    }

    function getDate(d)
    {
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", 
        "September", "October", "November", "December"];

        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        let day = days[d.getDay()];
        let month = months[d.getMonth()];
        let date = d.getDate();
        let year = d.getFullYear();

        return `${day}, ${month} ${date}, ${year}`;
    }
    //console.log("Show the weather" + weather);


var currentTemp = Math.floor(weather.main.temp);
var minimumTemp = Math.floor(weather.main.temp_min);
var maximumTemp = Math.floor(weather.main.temp_max);
makeChart([minimumTemp, currentTemp, maximumTemp]);

    
}



//---------------------------------------------------------------------------------------------------------
// JS for Modal Help Box.  Adapted from W3Schools page.

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

//---------------------------------------------------------------------------------------------------------

function makeChart(dataPoints)
{
    // console.log(dataPoints);

    let myChart = document.getElementById('myChart').getContext('2d');

    // Global Options
    Chart.defaults.global.defaultFontFamily = 'Lato';
    Chart.defaults.global.defaultFontSize = 18;
    Chart.defaults.global.defaultFontColor = 'whitesmoke';

    let barChart = new Chart(myChart, {
    type:'bar',
    data:{
        labels:['Low', 'Current', 'High'],
        datasets:[{
        //label:'Daily Temperatures',
        data: dataPoints,

        backgroundColor:[
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)'
        ],
        borderWidth:1,
        borderColor:'#777',
        hoverBorderWidth:3,
        hoverBorderColor:'#000'
        }]
    },
    options:{
        title:{
        display:true,
        text:'Daily Temperatures (°F)',
        fontSize:25
        },
        legend:{
        display:false,
        },
        layout:{
        padding:{
            left:50,
            right:0,
            bottom:0,
            top:0
        }
        },
        tooltips:{
        enabled:true
        },
        scales: {
            yAxes: [{
                display: true,
                ticks: {
                    suggestedMin: 0,    // minimum will be 0, unless there is a lower value.
                    // OR //
                    // beginAtZero: true   // minimum value will be 0.
                }
            }]
        }
    }
    });
}

//---------------------------------------------------------------------------------------------------------
// let myChart = document.getElementById('myChart').getContext('2d');

// let barChart = new myChart(myChart, {
//     type: 'bar', //bar, horizontalBar, pie, line, doughnut, radar, polarArea
//     data:{
//         labels: ['Min Temp', 'Current temp', 'Max temp'],
//         datasets: [{
//             label: 'Temperatures',
//             data: [
//                 weather.main.temp_min,
//                 weather.weather[0].main,
//                 weather.main.temp_max
//             ]
//         }]
//     },
//     //options{}
// });




//  $.getJSON("http://api.openweathermap.org/data/2.5/weather?q=" + city + "," + country + "&units=imperial&APPID=46a12c94ae0536aadb76d326ffa08d91", function(data) {
//      console.log(data);

//     var icon = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
//     var temp = "Current Temperature: " + Math.floor(data.main.temp) + " degrees fahrenheit";
//     var weather = "Current Weather: " + data.weather[0].main;

    // console.log(icon);
    // console.log(temp);
    // console.log(weather);

    // $("#city").append(city + ", " + country);
//     $("#icon").attr('src', icon);
//     $("#temp").append(temp);
//     $("#weather").append(weather);
// });
