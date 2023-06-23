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

for (let i=0; i < pokemonList.length; i++){
    if (pokemonList[i].height >= 7) {
        document.write(
            pokemonList[i].name + ` (Height: ${pokemonList[i].height})` + ' - Wow, that\'s big!'
        );
    }
    else {
        document.write(
            pokemonList[i].name + ` (Height: ${pokemonList[i].height})`
        );
    }
    // adds a row space in-between
    document.write('<br> <br>')
}
