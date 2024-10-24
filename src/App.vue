<script setup>
import Form from "./components/Form.vue";
import useWeather from "./composables/useWeather";
import Weather from "./components/Weather.vue";
import Spinner from "./components/Spinner.vue";
import Alert from "./components/Alert.vue";

const { searchWeather, weather, showWeather, loading, error } = useWeather();
</script>

<template>
  <h1 class="title">Weather App</h1>

  <div class="container weather-search">
    <Form @search-weather="searchWeather" />
    <Spinner v-if="loading" />
    <Alert v-if="error">{{ error }}</Alert>
    <Weather v-if="showWeather" :weather="weather" />
  </div>
</template>
