<template>
  <b-container> </b-container>
</template>
<script>
import { BContainer } from "bootstrap-vue";
import axios from "axios";
export default {
  name: "Weathercams.vue",
  components: {
    BContainer
  },
  data() {
    return {
      options: []
    };
  },
  methods: {
    async getMeta() {
      console.log("getting meta data ...");
      let result = await axios
        .get("https://tie.digitraffic.fi/api/v3/metadata/camera-stations")
        .then(function(response) {
          return response;
        })
        .catch(function(error) {
          console.log("error: ", error);
        });
      if (result.status == 200) {
        result.data.features.forEach(station => {
          this.options.push(station);
        });
      }
      console.log(this.options);
    }
  },
  mounted() {
    this.getMeta();
  }
};
</script>
<style scoped></style>
