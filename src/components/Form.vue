<script setup>
import { reactive, ref } from "vue";
import Alert from "./Alert.vue";

const emit = defineEmits(["search-weather"]);

const search = reactive({
  city: "",
  country: "",
});

const error = ref("");

const countries = [
  { code: "US", name: "United States" },
  { code: "MX", name: "Mexico" },
  { code: "AR", name: "Argentina" },
  { code: "CO", name: "Colombia" },
  { code: "CR", name: "Costa Rica" },
  { code: "ES", name: "Spain" },
  { code: "PE", name: "Peru" },
];

const validateWeather = () => {
  if (Object.values(search).includes("")) {
    error.value = "All fields are required";
    return;
  }

  error.value = "";

  emit("search-weather", search);
};
</script>

<template>
  <form class="form" @submit.prevent="validateWeather">
    <Alert v-if="error">All fields are required</Alert>
    <div class="field">
      <label for="city">City</label>
      <input
        id="city"
        type="text"
        v-model="search.city"
        placeholder="Enter a City"
      />
    </div>

    <div class="field">
      <label for="country">Country</label>
      <select id="country" v-model="search.country">
        <option value="">--Select a Country --</option>
        <option
          v-for="country in countries"
          :key="country.code"
          :value="country.code"
        >
          {{ country.name }}
        </option>
      </select>
    </div>

    <input type="submit" value="Search" />
  </form>
</template>
