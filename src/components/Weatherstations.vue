<template>
  <b-container v-if="getStationSuccess">
    <h5>
      <b-icon-clock></b-icon-clock>
      {{ timestamp }}
    </h5>
    <b-list-group>
      <b-list-group-item v-if="sensors.airValue">
        <b>Ilma:</b>
        {{ sensors.airValue }}{{ sensors.unitTemperature }}
      </b-list-group-item>
      <b-list-group-item v-if="sensors.roadValue">
        <b>Tie:</b>
        {{ sensors.roadValue }}{{ sensors.unitTemperature }}
      </b-list-group-item>
      <b-list-group-item v-if="sensors.groundValue">
        <b>Maa:</b>
        {{ sensors.groundValue }}{{ sensors.unitTemperature }}
      </b-list-group-item>
      <b-list-group-item v-if="sensors.dewPoint">
        <b>Kastepiste:</b>
        {{ sensors.dewPoint }}{{ sensors.unitTemperature }}
      </b-list-group-item>
      <b-list-group-item v-if="sensors.freezingPoint">
        <b>Jäätymispiste:</b>
        {{ sensors.freezingPoint }}{{ sensors.unitTemperature }}
      </b-list-group-item>
      <b-list-group-item v-if="sensors.averageWind">
        <b>Tuulen keskinopeus:</b>
        {{ sensors.averageWind }} {{ sensors.unitWind }}
      </b-list-group-item>
      <b-list-group-item v-if="sensors.maxWind">
        <b>Tuulen maksiminopeus:</b>
        {{ sensors.maxWind }} {{ sensors.unitWind }}
      </b-list-group-item>
      <b-list-group-item>
        <b>Sade:</b>
        <small v-if="sensors.precipitationIntensity == null">Ei mittaustietoja</small>
        {{ sensors.precipitationIntensity }} {{ sensors.unitPI }}
        <br />
        {{ sensors.rainDescription }}
      </b-list-group-item>
      <b-list-group-item v-if="sensors.humidity">
        <b>Kosteus:</b>
        {{ sensors.humidity }}{{ sensors.unitHumidity}}
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
import apiCalls from "../functions/apiCalls";
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
      let result = await apiCalls.getWeatherStations(this.stationID);

      if (result.status == 200) {
        this.stationData = result.data;
        this.getStationSuccess = true;
      }
    }
  },
  mounted() {
    this.getData();
  },
  computed: {
    timestamp: function() {
      return moment(this.stationData.weatherStations[0].measuredTime).format(
        "DD.MM.YYYY, HH:mm:ss"
      );
    },
    sensors: function() {
      let base = this.stationData.weatherStations[0].sensorValues;

      let data = new Object({
        airValue: null,
        unitTemperature: null,
        roadValue: null,
        groundValue: null,
        dewPoint: null,
        freezingPoint: null,
        averageWind: null,
        maxWind: null,
        unitWind: null,
        humidity: null,
        unitHumidity: null,
        rainDescription: null,
        precipitationIntensity: null,
        unitPI: null
      });
      console.log("data object: ", base);
      for (let i = 0; i < base.length; i++) {
        if (base[i].id == 1) {
          data.airValue = base[i].sensorValue;
          data.unitTemperature = base[i].sensorUnit;
        }
        if (base[i].id == 3) data.roadValue = base[i].sensorValue;
        if (base[i].id == 7) data.groundValue = base[i].sensorValue;
        if (base[i].id == 9) data.dewPoint = base[i].sensorValue;
        if (base[i].id == 10) data.freezingPoint = base[i].sensorValue;
        if (base[i].id == 16) {
          data.averageWind = base[i].sensorValue;
          data.unitWind = base[i].sensorUnit;
        }
        if (base[i].id == 17) data.maxWind = base[i].sensorValue;
        if (base[i].id == 21) {
          (data.humidity = base[i].sensorValue),
            (data.unitHumidity = base[i].sensorUnit);
        }
        if (base[i].id == 22)
          data.rainDescription = base[i].sensorValueDescriptionFi;
        if (base[i].id == 23) {
          data.precipitationIntensity = base[i].sensorValue;
          data.unitPI = base[i].sensorUnit;
        }
      }

      return data;
    }
  }
};
</script>
<style scoped>
h5 {
  text-align: center;
  font-weight: 600;
}
</style>
