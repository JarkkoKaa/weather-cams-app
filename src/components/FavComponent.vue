<template>
  <div id="fav-btn">
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
import findItems from "../functions/findItems";

export default {
  name: "FavComponent",
  components: {
    BIconStar,
    BIconStarFill
  },
  props: {
    favId: String,
    favName: String
  },
  methods: {
    addFavourite() {
      let fav = new Object({ id: this.favId, name: this.favName });
      this.$store.dispatch("addFavourite", fav);
    },
    removeFavourite() {
      this.$store.dispatch("removeFavourite", this.favId);
    }
  },
  computed: {
    isFavorited() {
      return findItems.fetchFav(this.favId);
    }
  }
};
</script>
<style scoped>
.fav-btn {
  cursor: pointer;
}
</style>