import { WeatherType } from "../../types"


export const getWeather = async (params: string): Promise<WeatherType> => {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?${params}&appid=${process.env.API_KEY}`)
    const data = await response.json()

    if (!response.ok) throw new Error(data.message)
    return data
  } catch (err) {
    throw new Error(err.message)
  }
}

export const getWeatherByName = (cityName: string): Promise<WeatherType> => {
  return getWeather('q=' + cityName)
}

export const getWeatherByLocation = (position: GeolocationPosition): Promise<WeatherType> => {
  const { latitude, longitude } = position.coords;
  const textContent = `lat=${latitude}&lon=${longitude}`;
  return getWeather(textContent)
}