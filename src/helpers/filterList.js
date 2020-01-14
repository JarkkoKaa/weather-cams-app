// o(n) filter list
function filterList(list, filter) {
  let filteredList = [];

  for (let i = 0; i < list.length; i++) {
    if (
      list[i].municipality.toUpperCase().includes(filter.toUpperCase()) ||
      list[i].province.toUpperCase().includes(filter.toUpperCase()) ||
      list[i].name.match(filter)
    )
      filteredList.push(list[i]);
  }

  return filteredList;
}

export default filterList;
