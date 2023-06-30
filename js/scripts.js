let pokemonRepository = (function () {
    let pokemonList = [
        {
            name: 'Bulbasaur',
            height: 7,
            type: ['GRASS','POISON']
        },
        {
            name: 'Jigglypuff',
            height: 0.5,
            type: ['FAIRY','NORMAL']
        },
        {
            name: 'Pikachu',
            height: 0.4,
            type: ['ELECTRIC']
        }
    ];
    function add(item) {
        if (
            typeof item === "object" && "name" in item && "height" in item && "type" in item
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

        button.addEventListener('click', function (event) {
            showDetails(pokemon);
          });
       
    }

    function showDetails(pokemon) {
        console.log(pokemon.name)
    }
    
    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        showDetails: showDetails
    };
})();

pokemonRepository.add({
    name: "Raichu",
    height: 0.8,
    type: ["ELECTRIC"]
});

console.log(pokemonRepository.getAll());
pokemonRepository.getAll().forEach(function(pokemon) {
pokemonRepository.addListItem(pokemon);
});
