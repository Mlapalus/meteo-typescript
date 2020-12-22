
export default class RequestData{

    static async getData(url: string | undefined): Promise<JSON> {
        if ((url === undefined)) {
            return JSON;
        }
        return await fetch(url).then(response => response.json())
    };
    static async getDataIpstack(url: string): Promise<IpstackCity> {
        return await fetch(url).then(response => response.json())
    };

    static async getDataIpfy(url: string): Promise<Ipfy> {
        return await fetch(url).then(response => response.json())
    };

    static async getDataMeteo(url: string): Promise<MeteoInterface> {
        return await fetch(url).then(response => response.json())
    };
};
