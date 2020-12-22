interface MeteoInterface 
{
  main: {
          temp: number,
          feels_like: number,
        },
  sys: {
        sunrise: number,
        sunset: number,
        },
  name: string,
  weather: [
            {
              description: string,
              icon: string,
              main: string
            }
            ]
  }