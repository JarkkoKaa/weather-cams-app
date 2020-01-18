import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
import axios from "axios";

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  key: "weather-cam-data",
  storage: window.sessionStorage
});

export default new Vuex.Store({
  state: {
    cameras: [],
    stations: [],
    favourites: []
  },
  mutations: {
    SET_CAMERAS(state, camerasMeta) {
      if (camerasMeta.data.features.length > 0) {
        camerasMeta.data.features.forEach(station => {
          state.cameras.push(
            new Object({
              id: station.properties.id,
              roadStationId: station.properties.roadStationId,
              municipality: station.properties.municipality,
              province: station.properties.province,
              name:
                station.properties.names.fi != undefined
                  ? station.properties.names.fi
                  : "Unknown"
            })
          );
        });
      }
    },
    SET_STATIONS(state, stationsMeta) {
      if (stationsMeta.data.features.length > 0) {
        stationsMeta.data.features.forEach(station => {
          state.stations.push(station);
        });
      }
    },
    SET_FAVOURITE(state, item) {
      state.favourites.push(item);
    },
    REMOVE_FAVOURITE(state, item) {
      state.favourites.splice(state.favourites.indexOf(item));
    }
  },
  actions: {
    async getMetaStation({ commit }) {
      let cameras = await axios
        .get(process.env.VUE_APP_CAMERA_META)
        .then(function(response) {
          return response;
        })
        .catch(function(error) {
          console.log("error: ", error);
        });
      if (cameras.status == 200) {
        commit("SET_CAMERAS", cameras);
      }
      let stations = await axios
        .get(process.env.VUE_APP_STATIONS_META)
        .then(function(response) {
          return response;
        })
        .catch(function(error) {
          console.log("error: ", error);
        });
      if (stations.status == 200) {
        commit("SET_STATIONS", stations);
      }
    },
    addFavourite({ commit }, item) {
      commit("SET_FAVOURITE", item);
    },
    removeFavourite({ commit }, item) {
      commit("REMOVE_FAVOURITE", item);
    }
  },
  plugins: [vuexLocal.plugin]
});
