import store from "../store";
// checking if item is in favourites
function checkFav(favItem) {
  let items = store.state.favourites;
  if (items.length > 0) {
    for (let i = 0; i < items.length; i++) {
      if (favItem == items[i]) {
        return true;
      }
    }
  }
  return false;
}

export default checkFav;
