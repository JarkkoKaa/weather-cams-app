import store from "../store";
export default {
  name: "findItems",
  // Boolean checking if item is in favourites
  fetchFav(id) {
    let items = store.state.favourites;
    if (items.length > 0) {
      for (let i = 0; i < items.length; i++) {
        if (id == items[i].id) {
          return true;
        }
      }
    }
    return false;
  },
  // Get station name
  fetchName(id) {
    let items = store.state.cameras;
    if (items.length > 0) {
      for (let i = 0; i < items.length; i++) {
        if (items[i].id == id) {
          return items[i].name;
        }
      }
    }
    return null;
  }
};
