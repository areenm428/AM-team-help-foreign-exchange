// Weather API Configuration
const API_KEY = 'e8e46e1d37msh6b9e6e86f16d78dp145ffcjsn8c2c6f2c9a8f';
const API_HOST = 'open-weather-map.p.rapidapi.com';
const RAPID_API_HOST = 'weatherapi-com.p.rapidapi.com';

// Units and State
let isCelsius = true;
let currentCity = 'London';
let savedLocations = JSON.parse(localStorage.getItem('weatherLocations')) || [];
let chart = null;

// DOM Elements
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const getCurrentLocationBtn = document.getElementById('getCurrentLocation');
const unitToggle = document.getElementById('unitToggle');
const unitLabel = document.getElementById('unitLabel');
const errorMessage = document.getElementById('errorMessage');
const loadingIndicator = document.getElementById('loadingIndicator');
const suggestions = document.getElementById('suggestions');

// Event Listeners
searchBtn.addEventListener('click', searchWeather);
searchInput.addEventListener('keypress', (e) => e.key === 'Enter' && searchWeather());
searchInput.addEventListener('input', handleSearchInput);
getCurrentLocationBtn.addEventListener('click', getLocationWeather);
unitToggle.addEventListener('change', toggleUnit);

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    getLocationWeather();
    displaySavedLocations();
});

// Get User's Current Location
function getLocationWeather() {
    if (navigator.geolocation) {
        showLoading(true);
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                fetchWeatherByCoords(latitude, longitude);
            },
            (error) => {
                console.log('Geolocation error:', error);
                // Default to London if geolocation fails
                fetchWeatherByCity(currentCity);
            }
        );
    } else {
        fetchWeatherByCity(currentCity);
    }
}

// Fetch Weather by Coordinates
async function fetchWeatherByCoords(lat, lon) {
    try {
        showLoading(true);
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': API_KEY,
                'x-rapidapi-host': RAPID_API_HOST
            }
        };

        const url = `https://${RAPID_API_HOST}/current.json?q=${lat},${lon}`;
        const response = await fetch(url, options);
        const data = await response.json();

        if (data.location) {
            displayWeather(data);
            currentCity = data.location.name;
            fetchWeatherForecast(data.location.name);
        }
    } catch (error) {
        console.error('Error fetching weather:', error);
        showError('Failed to fetch weather data');
    } finally {
        showLoading(false);
    }
}

// Fetch Weather by City Name
async function fetchWeatherByCity(city) {
    try {
        showLoading(true);
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': API_KEY,
                'x-rapidapi-host': RAPID_API_HOST
            }
        };

        const url = `https://${RAPID_API_HOST}/current.json?q=${city}`;
        const response = await fetch(url, options);
        const data = await response.json();

        if (data.location) {
            displayWeather(data);
            currentCity = data.location.name;
            fetchWeatherForecast(city);
        } else {
            showError('City not found');
        }
    } catch (error) {
        console.error('Error fetching weather:', error);
        showError('Failed to fetch weather data');
    } finally {
        showLoading(false);
    }
}

// Fetch Weather Forecast
async function fetchWeatherForecast(city) {
    try {
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': API_KEY,
                'x-rapidapi-host': RAPID_API_HOST
            }
        };

        const url = `https://${RAPID_API_HOST}/forecast.json?q=${city}&days=7`;
        const response = await fetch(url, options);
        const data = await response.json();

        if (data.forecast) {
            displayHourlyForecast(data.forecast.forecastday[0].hour);
            displayWeeklyForecast(data.forecast.forecastday);
            updateChart(data.forecast.forecastday[0].hour);
        }
    } catch (error) {
        console.error('Error fetching forecast:', error);
    }
}

// Display Current Weather
function displayWeather(data) {
    const current = data.current;
    const location = data.location;

    const temp = isCelsius ? current.temp_c : current.temp_f;
    const unit = isCelsius ? '°C' : '°F';
    const feelsLike = isCelsius ? current.feelslike_c : current.feelslike_f;

    const html = `
        <div class="current-weather-info">
            <div class="weather-main">
                <div class="weather-icon">
                    <img src="https:${current.condition.icon}" alt="${current.condition.text}" style="width: 80px; height: 80px;">
                </div>
                <div>
                    <div class="weather-temp-main">
                        <span class="weather-temp">${Math.round(temp)}</span>
                        <span class="weather-unit">${unit}</span>
                    </div>
                    <div class="weather-description">${current.condition.text}</div>
                    <div class="weather-location">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${location.name}, ${location.country}</span>
                    </div>
                </div>
            </div>
            <div class="weather-highlights">
                <div class="highlight">
                    <div class="highlight-label"><i class="fas fa-thermometer"></i> Feels Like</div>
                    <div class="highlight-value">${Math.round(feelsLike)}${unit}</div>
                </div>
                <div class="highlight">
                    <div class="highlight-label"><i class="fas fa-tint"></i> Humidity</div>
                    <div class="highlight-value">${current.humidity}%</div>
                </div>
                <div class="highlight">
                    <div class="highlight-label"><i class="fas fa-wind"></i> Wind Speed</div>
                    <div class="highlight-value">${Math.round(current.wind_kph)} km/h</div>
                </div>
                <div class="highlight">
                    <div class="highlight-label"><i class="fas fa-compress"></i> Pressure</div>
                    <div class="highlight-value">${current.pressure_mb} mb</div>
                </div>
                <div class="highlight">
                    <div class="highlight-label"><i class="fas fa-eye"></i> Visibility</div>
                    <div class="highlight-value">${Math.round(current.vis_km)} km</div>
                </div>
                <div class="highlight">
                    <div class="highlight-label"><i class="fas fa-droplets"></i> UV Index</div>
                    <div class="highlight-value">${current.uv}</div>
                </div>
            </div>
        </div>
    `;

    document.getElementById('currentWeatherContainer').innerHTML = html;
    displayWeatherDetails(current);
    displayAirQuality(current);
}

// Display Weather Details
function displayWeatherDetails(current) {
    const unit = isCelsius ? '°C' : '°F';
    const temp = isCelsius ? current.temp_c : current.temp_f;
    const dewpoint = isCelsius ? current.dewpoint_c : current.dewpoint_f;

    const html = `
        <div class="detail-card">
            <div class="detail-label"><i class="fas fa-thermometer"></i> Temperature</div>
            <div class="detail-value">${Math.round(temp)}${unit}</div>
        </div>
        <div class="detail-card">
            <div class="detail-label"><i class="fas fa-droplets"></i> Humidity</div>
            <div class="detail-value">${current.humidity}%</div>
        </div>
        <div class="detail-card">
            <div class="detail-label"><i class="fas fa-wind"></i> Wind Speed</div>
            <div class="detail-value">${Math.round(current.wind_kph)} km/h</div>
        </div>
        <div class="detail-card">
            <div class="detail-label"><i class="fas fa-arrow-up"></i> Wind Direction</div>
            <div class="detail-value">${current.wind_dir}</div>
        </div>
        <div class="detail-card">
            <div class="detail-label"><i class="fas fa-compress"></i> Pressure</div>
            <div class="detail-value">${current.pressure_mb} mb</div>
        </div>
        <div class="detail-card">
            <div class="detail-label"><i class="fas fa-eye"></i> Visibility</div>
            <div class="detail-value">${Math.round(current.vis_km)} km</div>
        </div>
        <div class="detail-card">
            <div class="detail-label"><i class="fas fa-cloud"></i> Cloud Coverage</div>
            <div class="detail-value">${current.cloud}%</div>
        </div>
        <div class="detail-card">
            <div class="detail-label"><i class="fas fa-droplet"></i> Dew Point</div>
            <div class="detail-value">${Math.round(dewpoint)}${unit}</div>
        </div>
    `;

    document.getElementById('weatherDetails').innerHTML = html;
}

// Display Air Quality
function displayAirQuality(current) {
    const aqi = current.air_quality;
    let quality = 'Unknown';
    let qualityClass = '';

    if (aqi) {
        const aqiValue = Math.round(aqi['us-epa-index'] || aqi['gb-defra-index'] || 0);
        switch (aqiValue) {
            case 1:
                quality = 'Good';
                qualityClass = 'aq-good';
                break;
            case 2:
                quality = 'Fair';
                qualityClass = 'aq-moderate';
                break;
            case 3:
                quality = 'Moderate';
                qualityClass = 'aq-moderate';
                break;
            case 4:
                quality = 'Poor';
                qualityClass = 'aq-poor';
                break;
            case 5:
                quality = 'Very Poor';
                qualityClass = 'aq-poor';
                break;
        }

        const html = `
            <div class="air-quality-card">
                <div class="aq-label">Air Quality Index</div>
                <div class="aq-index">${aqiValue}</div>
                <div class="aq-quality ${qualityClass}">${quality}</div>
            </div>
            <div class="air-quality-card">
                <div class="aq-label">PM2.5</div>
                <div class="aq-index">${Math.round(aqi.pm2_5 || 0)}</div>
                <div class="aq-label">µg/m³</div>
            </div>
            <div class="air-quality-card">
                <div class="aq-label">PM10</div>
                <div class="aq-index">${Math.round(aqi.pm10 || 0)}</div>
                <div class="aq-label">µg/m³</div>
            </div>
            <div class="air-quality-card">
                <div class="aq-label">NO₂</div>
                <div class="aq-index">${Math.round(aqi.no2 || 0)}</div>
                <div class="aq-label">µg/m³</div>
            </div>
        `;

        document.getElementById('airQualityContainer').innerHTML = html;
    }
}

// Display Hourly Forecast
function displayHourlyForecast(hours) {
    const hoursToShow = parseInt(document.querySelector('.filter-btn.active').dataset.hours) || 12;
    const selected = hours.slice(0, hoursToShow);

    let html = '';
    selected.forEach(hour => {
        const time = new Date(hour.time_epoch * 1000);
        const hourStr = time.getHours().toString().padStart(2, '0') + ':00';
        const temp = isCelsius ? hour.temp_c : hour.temp_f;
        const unit = isCelsius ? '°C' : '°F';

        html += `
            <div class="hourly-item">
                <div class="hourly-time">${hourStr}</div>
                <img src="https:${hour.condition.icon}" alt="${hour.condition.text}" style="width: 40px; height: 40px; margin: 10px auto;">
                <div class="hourly-temp">${Math.round(temp)}${unit}</div>
                <div class="hourly-chance"><i class="fas fa-droplets"></i> ${hour.chance_of_rain}%</div>
            </div>
        `;
    });

    document.getElementById('hourlyForecast').innerHTML = html;
}

// Display Weekly Forecast
function displayWeeklyForecast(forecast) {
    let html = '';
    forecast.slice(0, 7).forEach(day => {
        const date = new Date(day.date);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        const dayDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

        const maxTemp = isCelsius ? day.day.maxtemp_c : day.day.maxtemp_f;
        const minTemp = isCelsius ? day.day.mintemp_c : day.day.mintemp_f;
        const unit = isCelsius ? '°C' : '°F';

        html += `
            <div class="day-item">
                <div class="day-name">${dayName}</div>
                <div class="day-date">${dayDate}</div>
                <img src="https:${day.day.condition.icon}" alt="${day.day.condition.text}" style="width: 50px; height: 50px; margin: 0 auto;">
                <div class="day-temp-range">
                    <span class="day-max">${Math.round(maxTemp)}${unit}</span>
                    <span class="day-min">${Math.round(minTemp)}${unit}</span>
                </div>
                <div class="day-condition">${day.day.condition.text}</div>
            </div>
        `;
    });

    document.getElementById('weeklyForecast').innerHTML = html;
}

// Update Temperature Chart
function updateChart(hours) {
    const labels = [];
    const temps = [];
    const unit = isCelsius ? '°C' : '°F';

    hours.slice(0, 24).forEach(hour => {
        const time = new Date(hour.time_epoch * 1000);
        labels.push(time.getHours() + ':00');
        temps.push(isCelsius ? hour.temp_c : hour.temp_f);
    });

    const ctx = document.getElementById('temperatureChart');

    if (chart) {
        chart.destroy();
    }

    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: `Temperature (${unit})`,
                data: temps,
                borderColor: '#00a8ff',
                backgroundColor: 'rgba(0, 168, 255, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#00a8ff',
                pointBorderColor: '#0066cc',
                pointRadius: 5,
                pointHoverRadius: 7
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        color: '#b0b0b0',
                        font: { size: 12 }
                    }
                }
            },
            scales: {
                y: {
                    grid: { color: 'rgba(58, 69, 86, 0.5)' },
                    ticks: { color: '#b0b0b0' },
                    beginAtZero: false
                },
                x: {
                    grid: { color: 'rgba(58, 69, 86, 0.5)' },
                    ticks: { color: '#b0b0b0' }
                }
            }
        }
    });
}

// Search Weather
function searchWeather() {
    const city = searchInput.value.trim();
    if (city) {
        fetchWeatherByCity(city);
        searchInput.value = '';
        suggestions.classList.remove('show');
    }
}

// Handle Search Input with Suggestions
async function handleSearchInput(e) {
    const query = e.target.value;
    if (query.length < 2) {
        suggestions.classList.remove('show');
        return;
    }

    // Show some preset suggestions
    const presets = ['London', 'New York', 'Tokyo', 'Paris', 'Sydney', 'Dubai', 'Singapore', 'Bangkok'];
    const filtered = presets.filter(city => city.toLowerCase().includes(query.toLowerCase()));

    if (filtered.length > 0) {
        let html = '';
        filtered.forEach(city => {
            html += `<div class="suggestion-item" onclick="selectCity('${city}')">${city}</div>`;
        });
        suggestions.innerHTML = html;
        suggestions.classList.add('show');
    } else {
        suggestions.classList.remove('show');
    }
}

// Select City from Suggestions
function selectCity(city) {
    searchInput.value = city;
    fetchWeatherByCity(city);
    suggestions.classList.remove('show');
}

// Toggle Temperature Unit
function toggleUnit(e) {
    isCelsius = !e.target.checked;
    unitLabel.textContent = isCelsius ? '°C (Celsius)' : '°F (Fahrenheit)';
    localStorage.setItem('temperatureUnit', isCelsius ? 'celsius' : 'fahrenheit');
    
    // Refresh current display
    const container = document.getElementById('currentWeatherContainer');
    if (container.innerHTML && !container.innerHTML.includes('skeleton')) {
        fetchWeatherByCity(currentCity);
    }
}

// Display Saved Locations
function displaySavedLocations() {
    let html = `
        <div class="add-location" onclick="showAddLocationPrompt()">
            <div class="add-location-icon"><i class="fas fa-plus"></i></div>
            <div>Add Location</div>
        </div>
    `;

    savedLocations.forEach(location => {
        const temp = isCelsius ? location.temp_c : location.temp_f;
        const unit = isCelsius ? '°C' : '°F';

        html += `
            <div class="location-card" onclick="fetchWeatherByCity('${location.name}')">
                <button class="remove-location" onclick="removeLocation('${location.name}', event)">
                    <i class="fas fa-times"></i>
                </button>
                <div class="location-name">${location.name}</div>
                <div class="location-temp">${Math.round(temp)}${unit}</div>
                <div class="location-condition">${location.condition}</div>
            </div>
        `;
    });

    document.getElementById('savedLocations').innerHTML = html;
}

// Add Location to Saved List
function addSavedLocation(name, temp_c, temp_f, condition) {
    if (!savedLocations.find(loc => loc.name === name)) {
        savedLocations.push({ name, temp_c, temp_f, condition });
        localStorage.setItem('weatherLocations', JSON.stringify(savedLocations));
        displaySavedLocations();
        showSuccess(`${name} added to saved locations`);
    }
}

// Remove Location from Saved List
function removeLocation(name, event) {
    event.stopPropagation();
    savedLocations = savedLocations.filter(loc => loc.name !== name);
    localStorage.setItem('weatherLocations', JSON.stringify(savedLocations));
    displaySavedLocations();
    showSuccess(`${name} removed from saved locations`);
}

// Show Add Location Prompt
function showAddLocationPrompt() {
    const city = prompt('Enter city name:');
    if (city) {
        fetchWeatherByCity(city);
    }
}

// Utility Functions
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.add('show');
    setTimeout(() => errorMessage.classList.remove('show'), 5000);
}

function showSuccess(message) {
    errorMessage.textContent = message;
    errorMessage.style.background = '#4caf50';
    errorMessage.classList.add('show');
    setTimeout(() => {
        errorMessage.classList.remove('show');
        errorMessage.style.background = '#f44336';
    }, 3000);
}

function showLoading(show) {
    const loader = document.getElementById('loadingIndicator');
    if (show) {
        loader.classList.add('show');
    } else {
        loader.classList.remove('show');
    }
}

// Filter Hours
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('filter-btn')) {
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        // Refresh hourly forecast
        const container = document.getElementById('currentWeatherContainer');
        if (container.innerHTML && !container.innerHTML.includes('skeleton')) {
            // Would need to store current forecast data to refresh
        }
    }
});
