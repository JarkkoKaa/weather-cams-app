<template>
  <div id="loading-wrapper" v-if="isLoading">
    <b-spinner variant="primary" type="grow" label="Spinning"></b-spinner>
    <p>Ladataan...</p>
  </div>
</template>
<script>
import { BSpinner } from "bootstrap-vue";
export default {
  name: "LoadingComponent",
  components: {
    BSpinner
  },
  props: {
    isLoading: Boolean
  }
};
</script>
<style scoped>
span.spinner-grow.text-primary {
  width: 5rem;
  height: 5rem;
}
</style>