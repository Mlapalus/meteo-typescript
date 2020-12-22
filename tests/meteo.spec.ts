import Meteo from '../src/js/Meteo';
import RequestData from "../src/js/Request/RequestData";
import Selector from "../src/js/ElementsDisplay/Selector";
import 'jest-fetch-mock';
import Capitalize from '../src/js/Services/Capitalize';
import SortJsonArray from '../src/js/Services/SortJsonArray';

const meteo = new Meteo();

const myJson = [
{country: "Djibouti", geonameid: 225284, name: "Toto", subcountry: "Ali Sabieh"},
{country: "Netherlands", geonameid: 2747364, name: "Titi", subcountry: "South Holland"},
{country: "Netherlands", geonameid: 2747351, name: "Tutu", subcountry: "North Brabant"},
{country: "Spain", geonameid: 3119841, name: "Tata", subcountry: "Galicia"},
{country: "Spain", geonameid: 3119746, name: "Tete", subcountry: "Galicia"}
];

const mySortedJson = [
{country: "Spain", geonameid: 3119841, name: "Tata", subcountry: "Galicia"},
{country: "Spain", geonameid: 3119746, name: "Tete", subcountry: "Galicia"},
{country: "Netherlands", geonameid: 2747364, name: "Titi", subcountry: "South Holland"},
{country: "Djibouti", geonameid: 225284, name: "Toto", subcountry: "Ali Sabieh"},
{country: "Netherlands", geonameid: 2747351, name: "Tutu", subcountry: "North Brabant"}
];

it('should capitalize the first letter of a word ', () => 
{
  const response = Capitalize.capitalize('test');
  expect(response).toBe('Test');

})

it('should sort a JSON array', () => {
  const result = SortJsonArray.sortJson(myJson);
  expect(result).toEqual(mySortedJson);
})

it('should create a select input with 249 country', async () => 
{
  const select = document.createElement('select');
  const REQUEST_COUNTRY_URL = "https://pkgstore.datahub.io/core/country-list/data_json/data/8c458f2d15d9f2119654b29ede6e45b8/data_json.json";

  const options = await RequestData.getData(REQUEST_COUNTRY_URL);

  Selector.displayOptionsListCountry(select, Object.entries(options));
    
  expect(select.length).toEqual(249);

})

it('should load a JSON object', async() => {

    const requestCitytUrl =  "https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json";

    const cities = await meteo.initCities(requestCitytUrl);

    expect(JSON.stringify(cities).length).toBeGreaterThan(0);

});

it('should load the Input value', () => {

    const town = document.createElement('input');
    town.value = "TEST"
    const result = meteo.getTownByInput(town);

    expect(result).toBe('TEST');
});

it('should load the Input Select value', () => {

    const unitSelect = document.createElement('select');
    const unitOption = document.createElement('option');
    unitOption.value = "TEST";
    unitSelect.appendChild(unitOption);
    const result = meteo.getUnitsByInput(unitSelect);

    expect(result).toBe('TEST');
});
