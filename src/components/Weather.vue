<script setup>
import useWeather from "../composables/useWeather";

defineProps({
  weather: {
    type: Object,
    required: true,
  },
});

const { formatTemperature } = useWeather();
</script>

<template>
  <div class="result">
    <h2>Weather in {{ weather.name }}</h2>
    <p class="actual">
      {{ formatTemperature(weather.main.temp) }}<span>&deg;C</span>
    </p>
    <div class="temperatures">
      <p>
        Min: {{ formatTemperature(weather.main.temp_max) }}<span>&deg;C</span>
      </p>
      <p>
        Max: {{ formatTemperature(weather.main.temp_min) }}<span>&deg;C</span>
      </p>
    </div>
  </div>
</template>
