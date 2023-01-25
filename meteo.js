const getWeatherText = {
    // https://open-meteo.com/en/docs
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Fog',
    48: 'Depositing rime fog',
    51: 'Light drizzle',
    53: 'Moderate drizzle',
    55: 'Dense drizzle',
    56: 'Light freezing drizzle',
    57: 'Dense freezing drizzle',
    61: 'Slight rain',
    63: 'Moderate rain',
    65: 'Heavy rain',
    66: 'Light freezing rain',
    67: 'Heavy freezing rain',
    71: 'Slight snow fall',
    73: 'Moderate snow fall',
    75: 'Heavy snow fall',
    77: 'Snow grains',
    80: 'Slight rain showers',
    81: 'Moderate rain showers',
    82: 'Violent rain showers',
    85: 'Slight snow showers',
    86: 'Heavy snow showers',    
    95: 'Slight and moderate thunderstorm',
    96: 'Slight hail thunderstorm',
    99: 'Heavy hail thunderstorm'
}

async function getWeather() {
	const response = await fetch(
        // Calling for Barcelona latitude=41.39 & longitude=2.16
		'https://api.open-meteo.com/v1/forecast?latitude=41.39&longitude=2.16&daily&current_weather=true',
		{
			method: 'GET',
			headers: {
                'Accept': 'application/json',
			}
		}
	);
    if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}
    const data = await response.json();
    document.getElementById('js-weather-icon').setAttribute('src', '/assets/weather-icons/' + getWeatherIcon[data.current_weather.weathercode]);
    document.getElementById('js-weather-temperature').innerHTML = data.current_weather.temperature + "ºC";
}

getWeather();

const getWeatherIcon = {
    // https://open-meteo.com/en/docs
    0: 'sun.svg', // 'Clear sky',
    1: 'sun.svg', // 'Mainly clear',
    2: 'partly-cloudy.svg', // 'Partly cloudy',
    3: 'cloudy.svg', // 'Overcast',
    45: 'fog.svg', // 'Fog',
    48: 'fog.svg', // 'Depositing rime fog',
    51: 'haze.svg', // 'Light drizzle',
    53: 'haze.svg', // 'Moderate drizzle',
    55: 'haze.svg', // 'Dense drizzle',
    56: 'haze.svg', // 'Light freezing drizzle',
    57: 'haze.svg', // 'Dense freezing drizzle',
    61: 'rain--scattered.svg', // 'Slight rain',
    63: 'rain.svg', // 'Moderate rain',
    65: 'rain--heavy.svg', // 'Heavy rain',
    66: 'sleet.svg', // 'Light freezing rain',
    67: 'sleet.svg', // 'Heavy freezing rain',
    71: 'snow.svg', // 'Slight snow fall',
    73: 'snow--heavy.svg', // 'Moderate snow fall',
    75: 'snow--blizzard.svg', // 'Heavy snow fall',
    77: 'snow--scattered.svg', // 'Snow grains',
    80: 'rain--drizzle.svg', // 'Slight rain showers',
    81: 'rain.svg', // 'Moderate rain showers',
    82: 'rain--heavy.svg', // 'Violent rain showers',
    85: 'snow.svg', // 'Slight snow showers',
    86: 'snow--heavy.svg', // 'Heavy snow showers',    
    95: 'thunderstorm.svg', // 'Slight and moderate thunderstorm',
    96: 'thunderstorm--strong.svg', // 'Slight hail thunderstorm',
    99: 'thunderstorm--severe.svg', // 'Heavy hail thunderstorm'
}