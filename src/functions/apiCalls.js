import axios from "axios";

export default {
  name: "apiCalls",
  // request weather camera data
  async getWeatherCams(id) {
    try {
      let result = await axios
        .get(process.env.VUE_APP_CAMERA_BASE + id)
        .then(function(response) {
          return response;
        });
      return result;
    } catch (error) {
      return 0;
    }
  },
  // request weather station data
  async getWeatherStations(id) {
    try {
      let result = await axios
        .get(process.env.VUE_APP_STATIONS_BASE + id)
        .then(function(response) {
          return response;
        });
      return result;
    } catch (error) {
      return 0;
    }
  },
  // request camera meta data
  async getCamerasMeta() {
    try {
      let result = await axios
        .get(process.env.VUE_APP_CAMERA_META)
        .then(function(response) {
          return response;
        });
      return result;
    } catch (error) {
      return 0;
    }
  },
  // request station meta data
  async getStationsMeta() {
    try {
      let result = await axios
        .get(process.env.VUE_APP_STATIONS_META)
        .then(function(response) {
          return response;
        });
      return result;
    } catch (error) {
      return 0;
    }
  }
};
