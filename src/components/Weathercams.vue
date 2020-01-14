<template>
  <b-container>
    <b-row id="input-row">
      <b-col lg="5">
        <label for="filter">Filter</label>
        <b-form-input
          id="filter"
          v-model="filterStation"
          type="search"
          placeholder="Filter by province or municipality"
        ></b-form-input>
      </b-col>
      <b-col lg="5">
        <label for="select">Select location</label>
        <b-form-select v-model="selectedStation" id="select">
          <option
            v-for="station in getStations"
            :value="station.id"
            :key="station.roadStationId"
          >{{ station.municipality }}, {{ station.province }}: {{ station.name }}</option>
        </b-form-select>
      </b-col>
      <b-col lg="2" class="mt-05">
        <b-button block variant="success" @click="getData">
          Get
          <b-icon-search></b-icon-search>
        </b-button>
      </b-col>
    </b-row>
    <b-container v-if="getStationSuccess" id="camera-container" class="mt-05">
      <b-row class="mt-05">
        <b-list-group horizontal>
          <b-list-group-item
            v-for="(camera, index) in stationPreset.cameraPresets"
            :key="camera.id"
            @click="selectCamera(index)"
            button
          >
            <b-icon-camera-video></b-icon-camera-video>
            <br />
            {{ camera.presentationName }}
          </b-list-group-item>
        </b-list-group>
      </b-row>
      <b-row class="mt-05">
        <b-col id="img-col" class="ml-0" sm="12" lg="8">
          <b-img thumbnail fluid :src="cameraPresets.img" alt="Weather cam image"></b-img>
        </b-col>
        <b-col class="ml-0" sm="12" lg="4">
          <Weatherstations v-bind:stationID="cameraPresets.nearestStation" />
        </b-col>
      </b-row>
    </b-container>
  </b-container>
</template>
<script>
import {
  BContainer,
  BFormInput,
  BFormSelect,
  BButton,
  BRow,
  BCol,
  BImg,
  BListGroup,
  BListGroupItem,
  BIconSearch,
  BIconCameraVideo
} from "bootstrap-vue";
import Weatherstations from "./Weatherstations.vue";
import axios from "axios";
import filterList from "../helpers/filterList";

export default {
  name: "Weathercams.vue",
  components: {
    Weatherstations,
    BContainer,
    BFormInput,
    BFormSelect,
    BButton,
    BRow,
    BCol,
    BImg,
    BListGroup,
    BListGroupItem,
    BIconSearch,
    BIconCameraVideo
  },
  data() {
    return {
      selectedStation: "",
      getStationSuccess: false,
      stationData: null,
      stationPreset: null,
      filterStation: "",
      selectedCamera: "",
      cameraPresetIndex: 0
    };
  },
  methods: {
    async getData() {
      this.getStationSuccess = false;
      let result = await axios
        .get(process.env.VUE_APP_CAMERA_BASE + this.selectedStation)
        .then(function(response) {
          return response;
        })
        .catch(function(error) {
          console.log("error: ", error);
        });

      if (result.status == 200) {
        this.stationData = result.data;
        this.stationPreset = this.stationData.cameraStations[0];
        this.cameraPresetIndex = 0;
        this.getStationSuccess = true;
      }
    },
    selectCamera(index) {
      this.cameraPresetIndex = index;
    }
  },
  mounted() {
    if (!window.localStorage.getItem("weather-cam-data"))
      this.$store.dispatch("getMetaStation");
  },
  watch: {
    filterStation: function() {
      if (this.getStations.length > 0)
        this.selectedStation = this.getStations[0].id;
    }
  },
  computed: {
    getStations() {
      return filterList(this.$store.state.cameras, this.filterStation);
    },
    cameraPresets() {
      let presets = {
        name: this.stationPreset.cameraPresets[this.cameraPresetIndex]
          .presentationName,
        id: this.stationPreset.cameraPresets[this.cameraPresetIndex].id,
        img: this.stationPreset.cameraPresets[this.cameraPresetIndex].imageUrl,
        time: this.stationPreset.cameraPresets[this.cameraPresetIndex]
          .measuredTime,
        nearestStation: this.stationPreset.nearestWeatherStationId
      };

      return presets;
    }
  }
};
</script>
<style scoped>
.mt-05 {
  margin-top: 0.5rem;
}

#input-row {
  align-items: center;
}

.ml-0 {
  padding-left: 0px;
}
</style>
