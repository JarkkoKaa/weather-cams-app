import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
import apiCalls from "../helpers/apiCalls";

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  key: "weather-cam-data",
  storage: window.localStorage
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
    REMOVE_FAVOURITE(state, id) {
      for (let i = 0; i < state.favourites.length; i++) {
        if (id == state.favourites[i].id) {
          state.favourites.splice(i, 1);
        }
      }
    }
  },
  actions: {
    async getMetaStation({ commit }) {
      let cameras = await apiCalls.getCamerasMeta();
      if (cameras.status == 200) {
        commit("SET_CAMERAS", cameras);
      }
      let stations = await apiCalls.getStationsMeta();
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
