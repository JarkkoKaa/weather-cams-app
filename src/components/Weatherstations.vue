<template>
  <b-container v-if="getStationSuccess">
    <h5>
      <b-icon-clock></b-icon-clock>
      {{ timestamp }}
    </h5>
    <b-list-group>
      <b-list-group-item>
        <b>Air temperature:</b>
        {{ temperatures.airValue }}{{ temperatures.unit }}
      </b-list-group-item>
      <b-list-group-item>
        <b>Road temperature:</b>
        {{ temperatures.roadValue }}{{ temperatures.unit }}
      </b-list-group-item>
    </b-list-group>
  </b-container>
</template>
<script>
import {
  BContainer,
  BListGroup,
  BListGroupItem,
  BIconClock
} from "bootstrap-vue";
import axios from "axios";
import moment from "moment";

export default {
  name: "Weatherstations.vue",
  components: {
    BContainer,
    BListGroup,
    BListGroupItem,
    BIconClock
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
      return moment(this.stationData.weatherStations[0].measuredTime).format(
        "DD.MM.YYYY, h:mm:ss"
      );
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
<style scoped>
h5 {
  text-align: center;
}
</style>
