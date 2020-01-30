<template>
  <div class="searchInput-wrapper">
    <b-form-input type="search" v-model.lazy="filterStation" placeholder="Hae.." />
    <ul class="results shadow" :class="{ 'show-results': show}">
      <li
        v-for="result in results"
        :key="result.roadStationId"
        @click="selected(result.id)"
      >{{ result.municipality }}, {{ result.province }}: {{ result.name }}</li>
    </ul>
  </div>
</template>

<script>
import filterList from "../functions/filterList";
import { BFormInput } from "bootstrap-vue";

export default {
  name: "searchInput",
  components: {
    BFormInput
  },
  data() {
    return {
      show: false,
      results: null,
      filterStation: ""
    };
  },
  methods: {
    selected(id) {
      this.show = false;

      this.$emit("selectedStation", id);
    }
  },
  watch: {
    filterStation: function() {
      if (this.filterStation.length > 0) {
        this.show = true;
        this.results = filterList(
          this.$store.state.cameras,
          this.filterStation
        );
        if (this.results.length == 0) this.show = false;
      } else this.show = false;
    }
  }
};
</script>

<style scoped>
.results {
  display: none;
}

.show-results {
  display: block;
  position: absolute;
  z-index: 99;
  list-style: none;
  background-color: rgba(255, 255, 255, 0.95);
  border: 1px solid #888888;
  border-radius: 5px;
  width: 97%;
  max-height: 500px;
  padding: 0px;
  margin-top: 2px;
  overflow-y: auto;
  font-weight: 600;
}

.show-results > li {
  cursor: pointer;
  padding: 5px 5px 5px 12px;
}

.show-results > li:hover {
  background-color: #ececec;
}
</style>
