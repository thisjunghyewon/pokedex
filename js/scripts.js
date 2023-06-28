(function () {
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
})();



function myLoopFunction(list) {
    document.write('<p>' + list.name + '</p>')
  }
pokemonList.forEach(myLoopFunction);
