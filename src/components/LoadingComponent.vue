<template>
  <b-spinner variant="success" type="grow" label="Spinning" v-if="isLoading"></b-spinner>
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
</style>