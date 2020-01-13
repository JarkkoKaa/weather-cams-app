<template>
  <b-container v-if="getStationSuccess">
    <h5>Time: {{ timestamp }}</h5>
    <b-list-group>
      <b-list-group-item>
        <b>Air:</b>
        {{ temperatures.airValue }}{{ temperatures.unit }}
      </b-list-group-item>
      <b-list-group-item>
        <b>Road:</b>
        {{ temperatures.roadValue }}{{ temperatures.unit }}
      </b-list-group-item>
    </b-list-group>
  </b-container>
</template>
<script>
import { BContainer, BListGroup, BListGroupItem } from "bootstrap-vue";
import axios from "axios";

export default {
  name: "Weatherstations.vue",
  components: {
    BContainer,
    BListGroup,
    BListGroupItem
  },
  props: {
    stationID: Number
  },
  data() {
    return {
      stationData: null,
      getStationSuccess: false
    };
  },
  methods: {
    async getData() {
      this.getStationSuccess = false;
      let result = await axios
        .get(process.env.VUE_APP_STATIONS_BASE + this.stationID)
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
      console.log(this.stationData);
    }
  },
  mounted() {
    this.getData();
  },
  computed: {
    timestamp: function() {
      console.log(this.stationData);
      return this.stationData.weatherStations[0].measuredTime;
    },
    temperatures: function() {
      let base = this.stationData.weatherStations[0];
      let temperatures = {
        airValue: base.sensorValues[0].sensorValue,
        unit: base.sensorValues[0].sensorUnit,
        roadValue: base.sensorValues[1].sensorValue
      };
      return temperatures;
    }
  }
};
</script>
<style scoped></style>
