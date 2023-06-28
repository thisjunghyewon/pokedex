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
    function add(Raichu) {
        pokemonList.push(Raichu);
    }
    function getAll() {
        return pokemonList;
    }

    return {
        add: add,
        getAll: getAll
    }
})();



function myLoopFunction(list) {
    document.write('<p>' + list.name + '- height: ' + list.height + ', type: ' + list.type + '</p>')
  }
pokemonRepository.getAll().forEach(myLoopFunction);
