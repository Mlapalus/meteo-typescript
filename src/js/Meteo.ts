import RequestData from "./Request/RequestData";
import Selector from "./ElementsDisplay/Selector";
import SortJsonArray from "./Services/SortJsonArray";
import FormatDateTime from "./Services/FormatDateTime";
import Capitalize from "./Services/Capitalize";


export default class Meteo
{
  async initCountry(selectCountry: HTMLSelectElement | null, url: string | undefined): Promise<HTMLSelectElement | null> {
    const options = await RequestData.getData(url);
    return Selector.displayOptionsListCountry(selectCountry, Object.entries(options));
  };

  async initCities(url: string | undefined): Promise<Array<LoadedCities>> {
    let defaultCities : Array<LoadedCities>;
    defaultCities = [{'country': 'France, ', 'geonameid': 1234, 'name': 'paris', 'subcountry' : 'Ile de france'}];

    let cities = await RequestData.getData(url);
    if (!(cities instanceof Array)) 
    {
      return defaultCities;
    }
    else {
      SortJsonArray.sortJson(cities);
    return cities;       
    }
  };

  async getLocalIp(url: string): Promise<Ipfy>{
    const newIP = await RequestData.getDataIpfy(url);
    return newIP;
  };

  async getTownNameByIp(url: string): Promise<JSON>{
    const searchedTown = await RequestData.getData(url);
    return searchedTown;
  };

  getTownByInput(input: HTMLInputElement | null): string{
    if (input != null) 
    {
      return input.value;
    }
    else
    {
      return "paris";
    };
  };

  getUnitsByInput(input: HTMLSelectElement | null): string {
    if (input != null) 
    {
      return input.value;
    }
    else
    {
      return "metric";
    };
  };

  display(meteo: MeteoInterface, icons: Object, display: Object, town: HTMLInputElement | null) {

    const weather = meteo.weather[0];
    display['temperature'].innerHTML = `${Math.round(meteo.main.temp)}`;
    display['feelsLike'].innerHTML = `${Math.round(meteo.main.feels_like)}`;
    display['sunrise'].innerHTML = FormatDateTime.getTime(new Date(meteo.sys.sunrise));
    display['sunset'].innerHTML = FormatDateTime.getTime(new Date(meteo.sys.sunset));
    display['conditions'].innerHTML = Capitalize.capitalize(weather.description);
    display['wi-current'].className = icons[weather.icon];
    display['body'].className = weather.main;
    if (town != null) {
      town.value = meteo.name;
    }
  };

  async getMeteoByCity(url : string): Promise<MeteoInterface>
  {
    return await RequestData.getDataMeteo(url);  
  };
}