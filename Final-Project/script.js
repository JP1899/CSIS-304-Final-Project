// selects the search-box html element and adds a keypress event listener
const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', sendLocation);

// if the enter key is pressed, call getResults function
// send getResults city name passed into searchbox
function sendLocation(event)
{
    if (event.keyCode == 13)
    {
        getResults(searchbox.value);
    }
}

// function takes value user enters in text box
// and seaches API to get back JSON results for temp, weather, etc.
function getResults(textboxValue)
{
    //Make the ajax request
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/weather?q=" + textboxValue + "&units=imperial&APPID=46a12c94ae0536aadb76d326ffa08d91",
        type: "GET", //HTTP method
        dataType: "json", //The data recieved
        success: displayResults, //on success, show all the data
    });
}

// take JSON data givven to function and assign it to correct spot on webpage
// Watched this tutorial on template literals which helped to streamline this process
// https://www.youtube.com/watch?v=Re2FAmbNV8g&t=198s
function displayResults(weather)
{

    for (i in weather)
    {
        var cityName = document.querySelector('.location .city');
        cityName.innerText = `${weather.name}, ${weather.sys.country}`;

        var temp = document.querySelector('.current .temp');
        temp.innerText = `${Math.floor(weather.main.temp)}°F`;

        var currWeather = document.querySelector('.current .weather');
        currWeather.innerText = weather.weather[0].description;

        var hi_low = document.querySelector('.hi_low');
        hi_low.innerText = `${Math.floor(weather.main.temp_min)}°F / ${Math.floor(weather.main.temp_max)}°F`;

        var humidity = document.querySelector('.humidity');
        humidity.innerText = `Humidity: ${weather.main.humidity}%`;

        // got current date using JS Date built-in function
        // assigned to currentDate via let for use in this function
        // sent currentDate value to getDate method
        let currentDate = new Date();
        let date = document.querySelector('.location .date');
        date.innerText = getDate(currentDate);
    }

    // Take data recieved and turn into format needed
    // return string to update page
    function getDate(currentDateData)
    {
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", 
        "September", "October", "November", "December"];

        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        let day = days[currentDateData.getDay()];
        let month = months[currentDateData.getMonth()];
        let date = currentDateData.getDate();
        let year = currentDateData.getFullYear();

        return `${day}, ${month} ${date}, ${year}`;
    }

    // get hi, low, and current temperatures from inputted city
    // remove decimals using Math.floor
    // create an array and send to makeChart method 
    var currentTemp = Math.floor(weather.main.temp);
    var minimumTemp = Math.floor(weather.main.temp_min);
    var maximumTemp = Math.floor(weather.main.temp_max);
    makeChart([minimumTemp, currentTemp, maximumTemp]);

    
}

// JS for Modal Help Box.  Adapted from W3Schools.
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

// Imported external library Chart.js to make a chart of daily temperatures
function makeChart(tempData)
{
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
        data: tempData,
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
        text:'Breakdown of Daily Temperatures (°F)',
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
                    suggestedMin: 0,    // minimum temp will be 0, unless there is a lower temp value.
                }
            }]
        }
    }
    });
}
