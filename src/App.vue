<template>
  <div id="app">
    <b-container id="app-bg">
      <h1>Weather cameras</h1>
      <Weathercams />
      <Weatherstations />
      <small
        >Data is powered by
        <a href="https://www.digitraffic.fi/tieliikenne/">Digitraffic.fi</a>,
        the open data of finnish road network</small
      >
    </b-container>
  </div>
</template>

<script>
import Weathercams from "./components/Weatchercams";
import Weatherstations from "./components/Weatherstations";
import { BContainer } from "bootstrap-vue";

export default {
  name: "app",
  components: {
    Weathercams,
    Weatherstations,
    BContainer
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  background-color: #141414;
}

#app-bg {
  background-color: #e8e8e8;
}
</style>
