export default class FormatDateTime
{

  static getTime(date: Date): string
  {
    const hours = date.getHours();
    const minutes = "0" + date.getMinutes();
    return hours + ":" + minutes.substr(-2);
  }
}