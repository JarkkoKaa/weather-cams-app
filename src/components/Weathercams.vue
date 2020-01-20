<template>
  <b-container>
    <b-row id="input-row">
      <b-col lg="5">
        <label for="filter">Suodata sijainteja</label>
        <b-form-input
          id="filter"
          v-model="filterStation"
          type="search"
          placeholder="Suodata maakunnan tai kunnan mukaan"
        ></b-form-input>
      </b-col>
      <b-col lg="5">
        <label for="select">Valitse sijainti</label>
        <b-form-select v-model="selectedStation" @change="getData" id="select">
          <option
            v-for="station in getStations"
            :value="station.id"
            :key="station.roadStationId"
          >{{ station.municipality }}, {{ station.province }}: {{ station.name }}</option>
        </b-form-select>
      </b-col>
      <b-col lg="2" class="mt-05">
        <b-button id="fetch-btn" block variant="success" @click="getData">
          Hae
          <b-icon-search></b-icon-search>
        </b-button>
      </b-col>
      <b-col sm="12" v-if="this.$store.state.favourites.length > 0" style="margin-top: 10px;">
        <label for="fav-select">Suosikkisi:</label>
        <b-form-select v-model="selectedStation" id="fav-select" @change="getData">
          <option
            v-for="station in this.$store.state.favourites"
            :value="station.id"
            :key="station.id"
          >{{ station.name }}</option>
        </b-form-select>
      </b-col>
    </b-row>
    <b-container v-if="getStationSuccess" id="camera-container" class="mt-05">
      <b-row id="select-cameras-row" class="mt-05">
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
          <b-row id="user-btn-row">
            <b-col sm="12">
              <FavouriteCheckbox :favId="cameraPresets.id" :favName="nameOfStation" />
            </b-col>
          </b-row>
          <b-img thumbnail fluid :src="cameraPresets.img" alt="Weather cam image"></b-img>
        </b-col>
        <b-col class="ml-0" sm="12" lg="4">
          <Weatherstations v-bind:stationID="cameraPresets.nearestStation" />
        </b-col>
      </b-row>
    </b-container>
    <b-container>
      <Loading :isLoading="loading" />
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
import filterList from "../functions/filterList";
import FavouriteCheckbox from "./FavouriteCheckbox";
import Loading from "./LoadingComponent";
import findItems from "../functions/findItems";

export default {
  name: "Weathercams",
  components: {
    Weatherstations,
    FavouriteCheckbox,
    Loading,
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
      loading: false,
      stationPreset: null,
      filterStation: "",
      selectedCamera: "",
      cameraPresetIndex: 0
    };
  },
  methods: {
    async getData() {
      this.getStationSuccess = false;
      this.loading = true;
      let result = await axios
        .get(process.env.VUE_APP_CAMERA_BASE + this.selectedStation)
        .then(function(response) {
          return response;
        })
        .catch(function(error) {
          console.log("error: ", error);
        });

      if (result.status == 200) {
        this.stationPreset = result.data.cameraStations[0];
        this.cameraPresetIndex = 0;
        this.getStationSuccess = true;
        this.loading = false;
      }
    },
    selectCamera(index) {
      this.cameraPresetIndex = index;
    }
  },
  mounted() {
    if (!window.sessionStorage.getItem("weather-cam-data"))
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
    nameOfStation() {
      return findItems.fetchName(this.stationPreset.id);
    },
    cameraPresets() {
      let presets = {
        name: this.stationPreset.cameraPresets[this.cameraPresetIndex]
          .presentationName,
        id: this.stationPreset.id,
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
@media only screen and (min-width: 992px) {
  #fetch-btn {
    margin-top: 22px;
  }
}

#select-cameras-row {
  overflow: auto;
}

#user-btn-row {
  align-items: center;
}
</style>
