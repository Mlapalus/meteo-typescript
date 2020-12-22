export default class SortJsonArray 
{

  static sortJson(json: Array<LoadedCities>): Array<LoadedCities>
  {
    json.sort(function compare(a,b){
                if (a.name < b.name) return -1;
                if (a.name > b.name) return 1;
                return 0;
    });
    return json;

  }

}