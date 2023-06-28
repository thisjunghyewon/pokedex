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
    function add(pokemon) {

        if (typeof pokemon === typeof pokemonList) {
            pokemonList.push(pokemon);
        }
    }
    function getAll() {
        return pokemonList;
    }

    return {
        add: add,
        getAll: getAll
    }
})();

pokemonRepository.add({
    name: 'Raichu',
    height: 0.8,
    type: ['ELECTRIC']
})



function myLoopFunction(list) {
    document.write('<p>' + list.name + '- height: ' + list.height + ', type: ' + list.type + '</p>')
  }
pokemonRepository.getAll().forEach(myLoopFunction);
