<template>
  <div id="app">
    <b-container id="app-container">
      <h1 id="app-title">Kelikamerat</h1>
      <Weathercams />
    </b-container>
    <b-container id="app-footer">
      <small>
        Source of traffic data
        <a href="https://tmfg.fi/fi">Traffic Management Finland</a> /
        <a href="https://www.digitraffic.fi/tieliikenne/">Digitraffic.fi</a> , license CC 4.0 BY,
        open data of the finnish road network | View projects
        <a
          href="https://github.com/JarkkoKaa/weather-cams-app"
        >GitHub repository</a>
      </small>
    </b-container>
  </div>
</template>

<script>
import Weathercams from "./components/Weathercams";

import { BContainer } from "bootstrap-vue";

export default {
  name: "app",
  components: {
    Weathercams,
    BContainer
  }
};
</script>

<style>
html,
body {
  height: 100%;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  height: auto !important;
  min-height: 100%;
}

/* Showing background image is unnecessary when screen size is below 576px */
@media only screen and (min-width: 576px) {
  #app {
    background-image: url("./assets/bg-road-1.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    background-position-x: center;
    background-position-y: center;
  }
}

#app-container {
  background-color: #fcfcfc;
  padding-bottom: 1rem;
  min-height: 500px;
}

#app-title {
  margin-left: 0.9rem;
  font-weight: 900;
  font-size: 3rem;
}

#app-footer {
  text-align: center;
  background-color: #dbdbdb;
  padding: 1.5rem;
}
</style>
