<template>
  <div>
    <span id="add-fav" v-if="!isFavorited" class="fav-btn" @click="addFavourite">
      <b-icon-star></b-icon-star>Lisää suosikkeihin
    </span>
    <span id="removeFavourite" v-if="isFavorited" class="fav-btn" @click="removeFavourite">
      <b-icon-star-fill></b-icon-star-fill>Suosikeissa
    </span>
  </div>
</template>
<script>
import { BIconStar, BIconStarFill } from "bootstrap-vue";
import checkFav from "../helpers/checkFav";

export default {
  name: "FavComponent",
  components: {
    BIconStar,
    BIconStarFill
  },
  props: {
    favItem: String
  },
  methods: {
    addFavourite() {
      this.$store.dispatch("addFavourite", this.favItem);
    },
    removeFavourite() {
      this.$store.dispatch("removeFavourite", this.favItem);
    }
  },
  computed: {
    isFavorited() {
      return checkFav(this.favItem);
    }
  }
};
</script>
<style scoped>
.fav-btn {
  cursor: pointer;
}
</style>