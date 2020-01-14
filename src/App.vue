<template>
  <div id="app">
    <b-container id="app-container">
      <h1 id="app-title">Weather cameras</h1>
      <Weathercams />
    </b-container>
    <b-container id="app-footer">
      <small>
        Data is powered by
        <a href="https://www.digitraffic.fi/tieliikenne/">Digitraffic.fi</a>,
        open data of the finnish road network
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
  background-image: url("./assets/bg-road-1.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position-x: center;
  background-position-y: center;
  height: auto !important;
  min-height: 100%;
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
