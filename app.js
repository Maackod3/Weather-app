const weatherIcons = {
    'Rain': 'wi wi-day-rain',
    'Clouds': 'wi wi-cloudy',
    'Clear': 'wi wi-day-sunny',
    'Snow': 'wi wi-day-snow',
    'Mist': 'wi wi-day-fog',
    'Drizzle': 'wi wi-day-sleet'
};

const weatherBackground = {
    'Rain': '#183152',
    'Clouds': '#6191A8',
    'Clear': '#FFD470',
    'Snow': '#E4EEF0',
    'Mist': '#BBCFDA',
    'Drizzle': '#A6A5A1'
};

const weatherAPI = 'https://fcc-weather-api.glitch.me/api/current?lon=:longitude&lat=:latitude';

const getIP = 'https://api.ipify.org?format=json';

const geoIP = 'http://api.ipstack.com/ ?access_key=d30b17e12bfe94d85a9970e10110b6f6';

function capitalize(str) {
    return str[0].toUpperCase() + str.slice(1);
}

async function main() {
   const ip = await fetch(getIP).then(response => response.json()).then(json => json.ip);

   const lng = await fetch(`http://api.ipstack.com/${ip}?access_key=d30b17e12bfe94d85a9970e10110b6f6`).then(response => response.json()).then(json => json.longitude);

   const ltd = await fetch(`http://api.ipstack.com/${ip}?access_key=d30b17e12bfe94d85a9970e10110b6f6`).then(response => response.json()).then(json => json.latitude);

   const meteo = await fetch(`https://fcc-weather-api.glitch.me/api/current?lon=${lng}&lat=${ltd}`).then(response => response.json()).then(json => json);

   displayWeather(meteo);

} 

function displayWeather(data) {
    const name = data.name;
    const temperature = Math.round(data.main.temp);
    const conditions = data.weather[0].main;
    const fahrenheit = (temperature * (9/5)) + 32;

    document.querySelector('#ville').textContent = name;
    document.querySelector('#temp').textContent = temperature;
    document.querySelector('#condition').textContent = capitalize(conditions);
    document.querySelector('i.wi').className = weatherIcons[conditions]
    document.body.className = conditions.toLowerCase();
    document.querySelector('button').addEventListener('click', () => {
        document.querySelector('#temp').textContent = fahrenheit;
        document.querySelector('button').addEventListener('click', () => {
            document.querySelector('#temp').textContent = temperature;
        });
    });
    
}

main();


