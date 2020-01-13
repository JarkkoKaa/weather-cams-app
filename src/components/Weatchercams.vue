<template>
  <b-container>
    <b-form-select v-model="selected">
      <option
        v-for="station in getStations"
        :value="station.properties.id"
        :key="station.properties.roadStationId"
      >{{ station.properties.names.fi }}</option>
    </b-form-select>
    <b-button variant="success" @click="getData">Get</b-button>
    <b-container v-if="getStationSuccess">
      <b-row>
        <b-col>
          <h3>Road to: {{ cameraPresets.name }}</h3>
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="12" lg="8">
          <b-img thumbnail fluid :src="cameraPresets.img" alt="Weather cam image"></b-img>
        </b-col>
        <b-col sm="12" lg="4">
          <Weatherstations v-bind:stationID="cameraPresets.nearestStation" />
        </b-col>
      </b-row>
    </b-container>
  </b-container>
</template>
<script>
import {
  BContainer,
  BFormSelect,
  BButton,
  BRow,
  BCol,
  BImg
} from "bootstrap-vue";
import Weatherstations from "./Weatherstations.vue";
import axios from "axios";

export default {
  name: "Weathercams.vue",
  components: {
    Weatherstations,
    BContainer,
    BFormSelect,
    BButton,
    BRow,
    BCol,
    BImg
  },
  data() {
    return {
      selected: "",
      getStationSuccess: false,
      stationData: null
    };
  },
  methods: {
    async getData() {
      this.getStationSuccess = false;
      let result = await axios
        .get(process.env.VUE_APP_CAMERA_BASE + this.selected)
        .then(function(response) {
          return response;
        })
        .catch(function(error) {
          console.log("error: ", error);
        });

      if (result.status == 200) {
        this.stationData = result.data;
        this.getStationSuccess = true;
      }
    }
  },
  mounted() {
    if (!window.localStorage.getItem("weather-cam-data"))
      this.$store.dispatch("getMetaStation");
  },
  computed: {
    getStations() {
      return this.$store.state.cameras;
    },
    cameraPresets() {
      let base = this.stationData.cameraStations[0];

      let presets = {
        name: base.cameraPresets[0].presentationName,
        img: base.cameraPresets[0].imageUrl,
        time: base.cameraPresets[0].measuredTime,
        nearestStation: base.nearestWeatherStationId
      };

      return presets;
    }
  }
};
</script>
<style scoped></style>
