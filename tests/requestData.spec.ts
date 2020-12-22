import RequestData from '../src/js/Request/RequestData';
import 'jest-fetch-mock';

describe('All Request Data', () => {
    
    it.concurrent(' should return a Array of Country with Afghanistan in first index', async () =>
    {
        const requestCountrytUrl = "https://pkgstore.datahub.io/core/country-list/data_json/data/8c458f2d15d9f2119654b29ede6e45b8/data_json.json";
        const request = await RequestData.getData(requestCountrytUrl);
        expect(request[0].Name).toBe("Afghanistan");
    });

    it.concurrent('should return a Array of Cities with Les Escaldes in first index', async () =>
    {
        const requestCitytUrl = "https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json";
        const request = await RequestData.getData(requestCitytUrl);
            expect(request[0].country).toBe("Andorra");
            expect(request[0].name).toBe("les Escaldes");
            expect(request[0].geonameid).toBe(3040051);
    });

    it.concurrent('should return a object with the property ip ', async () =>
    {
        const requestIptUrl = "https://api.ipify.org?format=json";
        const request = await RequestData.getData(requestIptUrl);
        expect(request).toHaveProperty('ip');
    });

    it.concurrent('should find a error with https access', async () =>
    {
        const requestCitytUrl = 'https://api.ipstack.com/'+'176.187.155.146'+'?access_key='+"34751dcc6542b9445efba4a6f762beec"+'&output=json';
        const data = await RequestData.getData(requestCitytUrl);
        expect(data).toHaveProperty('error');
    });

    it.concurrent('should find a town with a url and a ip and success with http access', async () =>
    {

        const requestIptUrl = "https://api.ipify.org?format=json";
        const request = await RequestData.getData(requestIptUrl);
        expect(request).toHaveProperty('ip');
        const actualIP = request["ip"];
        const requestCitytUrl = 'http://api.ipstack.com/'+actualIP+'?access_key='+"34751dcc6542b9445efba4a6f762beec"+'&output=json';
        const data = await RequestData.getData(requestCitytUrl);
        expect(data).toHaveProperty('city');
    });

    it.concurrent('should get a meteo report for a city', async () =>
    {
        
        const requestCitytUrl = 'https://api.openweathermap.org/data/2.5/weather?q=paris&appid=02c478b69cdc3cd2f342270f2b7c85bb&lang=fr';
        const data = await  RequestData.getData(requestCitytUrl);
        expect(data).toHaveProperty('id');
    });
})


