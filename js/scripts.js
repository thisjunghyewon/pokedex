let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  function add(item) {
    if (
      typeof item === "object" &&
      "name" in item &&
      "height" in item &&
      "type" in item
    ) {
      pokemonList.push(item);
    } else {
      console.log(`"${item}" is not a valid Pokémon!`);
    }
  }
  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    let pokemonIndex = document.querySelector(".pokemon-index");
    let listItem = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = `${pokemon.name}`;
    button.classList.add("button-class");
    listItem.appendChild(button);
    pokemonIndex.appendChild(listItem);

    button.addEventListener("click", function (event) {
      showDetails(pokemon);
    });
  }

  function showDetails(pokemon) {
    console.log(pokemon.name);
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
  };
})();

pokemonRepository.add({
  name: "Raichu",
  height: 0.8,
  type: ["ELECTRIC"],
});

console.log(pokemonRepository.getAll());
pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});
