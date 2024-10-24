import axios from "axios";
import { computed, ref } from "vue";

export default function useWeather() {
  const weather = ref({});
  const loading = ref(false);
  const error = ref("");

  const searchWeather = async ({ city, country }) => {
    const apiKey = import.meta.env.VITE_APP_WEATHER_API_KEY;

    loading.value = true;
    weather.value = {};
    error.value = "";

    try {
      const geocodingUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${country}&limit=1&appid=${apiKey}`;
      const { data: geocodingData } = await axios.get(geocodingUrl);

      const { lat, lon } = geocodingData[0];

      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&exclude=minutely&appid=${apiKey}`;
      const { data: weatherData } = await axios.get(weatherUrl);

      weather.value = weatherData;
    } catch {
      error.value = "City not found";
    } finally {
      loading.value = false;
    }
  };

  const showWeather = computed(() => {
    return Object.keys(weather.value).length > 0;
  });

  const formatTemperature = (temperature) => parseInt(temperature - 273.15);

  return {
    searchWeather,
    weather,
    showWeather,
    formatTemperature,
    loading,
    error,
  };
}
