import Meteo from './Meteo';
import Selector from './ElementsDisplay/Selector';

const ICONS = {
          "Rain": "wi wi-day-rain",
          "Clouds": "wi wi-day-cloudy",
          "Clear": "wi wi-day-clear",
          "Snow": "wi wi-dqy-snow",
          "mist": "wi wi-day-fog",
          "Drizzle": "wi wi-day-sleet",
          "Fog": "wi wi-day-fog",
          "01d": "wi wi-day-clear",
          "01n": "wi wi-night-clear",
          "02d": "wi wi-day-sunny-overcast",
          "02n": "wi wi-night-alt-partly-cloudy",
          "03d": "wi wi-day-cloudy",
          "03n": "wi wi-night-cloudy",
          "04d": "wi wi-day-sunny-overcast",
          "04n": "wi wi-night-alt-partly-cloudy",
          "09d": "wi wi-day-showers",
          "09n": "wi wi-night-alt-showers",
          "10d": "wi wi-day-rain",
          "10n": "wi wi-night-rain",
          "11d": "wi wi-day-ligthning",
          "11n": "wi wi-night-alt-lightning",
          "13d": "wi wi-day-snow",
          "13n": "wi wi-night-snow",
          "50d": "wi wi-day-haze",
          "50n": "wi wi-night-fog"
          };
  const COUNTRIES_URL = "https://pkgstore.datahub.io/core/country-list/data_json/data/8c458f2d15d9f2119654b29ede6e45b8/data_json.json";
  
  const CITIES_URL =  "https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json";
  

const KEY_OPENWEATHER = process.env.KEY_OPENWEATHER;

let newTown: HTMLInputElement | null;
let selectCountry: HTMLSelectElement | null;
let selectCity: HTMLSelectElement | null;
let units: HTMLSelectElement | null;
let citiesSelectedByInput: HTMLInputElement | null; 


selectCountry = document.querySelector('select');
selectCity = document.querySelector('#cities-select');
newTown = document.querySelector('#cities-select');
units = document.querySelector('#units-select');
citiesSelectedByInput = document.querySelector('#town');

const elements = {
  'temperature': document.getElementById('temperature'),
  'feelsLike': document.getElementById('feelsLike'),
  'sunrise': document.getElementById('sunrise'),
  'sunset': document.getElementById('sunset'),
  'conditions': document.querySelector('#conditions'),
  'wi-current': document.getElementById('wi-current'),
  'body': document.getElementsByTagName('body')[0]
};


let citiesSelectedByCountry: LoadedCities[];
let city: string;
let tempUnit: string;

const meteo = new Meteo();
meteo.initCountry(selectCountry, COUNTRIES_URL).then(result => selectCountry = result);
meteo.initCities(CITIES_URL).then(result => citiesSelectedByCountry = result);
city = "paris";
tempUnit = "metrics";
const urlOpenWeather = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${KEY_OPENWEATHER}&lang=fr&units=${tempUnit}`;

meteo.getMeteoByCity(urlOpenWeather).then(result => meteo.display(result,ICONS,elements,citiesSelectedByInput));


citiesSelectedByInput?.addEventListener('keydown', (e) =>
            {
              if (e.keyCode === 13) {
                    e.preventDefault();
                    city = meteo.getTownByInput(newTown);
                    tempUnit = meteo.getUnitsByInput(units);
              }
            });

selectCountry?.addEventListener('change', () => {
  if (selectCountry != null) {
    const countrySelected = selectCountry.options[selectCountry.selectedIndex].value;
    selectCity = Selector.displayOptionsListCity(selectCity, citiesSelectedByCountry, countrySelected);
  }
});

selectCity?.addEventListener('change', (event) => 
{
  if (citiesSelectedByInput != null) {
    if (event.target != null) {
        citiesSelectedByInput.value = (<HTMLSelectElement>event.target).value;
    }
  }
  city = meteo.getTownByInput(newTown);
  tempUnit = meteo.getUnitsByInput(units);
  const urlOpenWeather = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${KEY_OPENWEATHER}&lang=fr&units=${tempUnit}`;
  meteo.getMeteoByCity(urlOpenWeather).then(result => meteo.display(result,ICONS,elements,citiesSelectedByInput));
});


units?.addEventListener('change', (event) => 
{
  const modeTemp = document.querySelector('#unit');
  const modeTempFeelsLike = document.querySelector('#unit-feelsLike');

  if (modeTemp != null && modeTempFeelsLike != null) {
      if ((<HTMLSelectElement>event.target).value == "imperial") 
      { 
        modeTemp.innerHTML = "F";
        modeTempFeelsLike.innerHTML = "F";
      }
      else if ((<HTMLSelectElement>event.target).value == "metric") 
      {
        modeTemp.innerHTML = "C";
        modeTempFeelsLike.innerHTML = "C";
      }
      else 
      {
        modeTemp.innerHTML = "K";
        modeTempFeelsLike.innerHTML = "K";
      }
  }
  city = meteo.getTownByInput(newTown);
  tempUnit = meteo.getUnitsByInput(units);
  const urlOpenWeather = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${KEY_OPENWEATHER}&lang=fr&units=${tempUnit}`;
  meteo.getMeteoByCity(urlOpenWeather).then(result => meteo.display(result,ICONS,elements,citiesSelectedByInput));
});


