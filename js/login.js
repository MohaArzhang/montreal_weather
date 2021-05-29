// =================== DATE AND TIME

let todayDateTxt = document.getElementById('todayDateTxt');
let timeNowTxt = document.getElementById('timeNowTxt');
let container = document.getElementById('container');
let today = new Date();
let weekday = today.getDay();
todayDateTxt.textContent = today.toLocaleString('en-AU', {weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'});
timeNowTxt.textContent = today.toLocaleString('en-US', {hour: 'numeric', hour12: true , minute: 'numeric', second: 'numeric'});
let message = document.getElementById("message");

// =================== CHECKING VALIDITY OF USERNAME

function loginRun() {
    const emailAd = $('#emailAd')[0].value;
    if (emailAd === "admin@yopmail.com") {
        checkPass();
    }
    else {
        message.style.textAlign = "center";
        message.style.marginTop = "5px";
        container.style.paddingBottom = "15px";
        message.innerHTML = '<div style= "color:red;">Please enter a valid email!</div>';
    }
}

// =================== CHECKING VALIDITY OF PASSWORD

function checkPass() {
    const pass = $('#pass')[0].value;
    if (pass === "") {
        message.style.textAlign = "center";
        message.style.marginTop = "5px";
        container.style.paddingBottom = "15px";
        message.innerHTML = '<div style= "color:red;">Please enter a valid password!</div>';
    } else if (pass.length < 6) {
        message.style.textAlign = "center";
        message.style.marginTop = "5px";
        container.style.paddingBottom = "30px";
        message.innerHTML = '<div style= "color:red;">Password length must be at least 6 characters!</div>';
    } else if (pass != "adminyopmail") {
        message.style.textAlign = "center";
        message.style.marginTop = "5px";
        container.style.paddingBottom = "15px";
        message.innerHTML = '<div style= "color:red;">Please enter a valid password!</div>';
    } else if (pass === "adminyopmail") {
        $.ajax('http://dataservice.accuweather.com/forecasts/v1/daily/5day/56186?apikey=VHC7OpHbH5Tnao6HwIg2QbkGuQASRd0T&metric=true').done(displayWeather);
    }
}


// =================== FETCHING FROM API


function displayWeather(data) {
    container.style.height = "auto";
    container.style.paddingBottom = "10px";
    message.style.textAlign = "center";
    message.innerHTML = '<p style="color: blue">Weather in Montreal<br>for the next 5 days:</p>';
    console.log(data);
    for (var i = 0; i < 5; i++) {
        const day = document.createElement('div')
        const dayNum = i + 1;
        day.innerHTML = '<span style="color: red">Day </span>' + '<span style="color: red">' + dayNum + '</span>';
        message.appendChild(day);
        const date = document.createElement('div');
        date.textContent = data.DailyForecasts[i].Date;
        message.appendChild(date);
        const minMax = document.createElement('div');
        minMax.textContent = "Min: " + data.DailyForecasts[i].Temperature.Minimum.Value + "C, Max: " + data.DailyForecasts[i].Temperature.Maximum.Value + "C";
        message.appendChild(minMax);
        const dayNight = document.createElement('div');
        dayNight.textContent = "Day: " + data.DailyForecasts[i].Day.IconPhrase + ", Night: " + data.DailyForecasts[i].Night.IconPhrase;
        message.appendChild(dayNight);
        const line = document.createElement('p');
        message.appendChild(line);
        day.style.marginLeft = "10px";
        day.style.textAlign = "left";
        date.style.marginLeft = "10px";
        date.style.textAlign = "left";
        minMax.style.marginLeft = "10px";
        minMax.style.textAlign = "left";
        dayNight.style.marginLeft = "10px";
        dayNight.style.textAlign = "left";
    }
}