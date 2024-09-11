
const pokemonList = document.getElementById('pokemon-list');
const loadMore = document.getElementById('loadMore');

let offset = 0;
const limit = 50;
const qntdMaxPokemons = 649;


function convertPokemonTypeToLi (pokemonTypes){
    return pokemonTypes.map((type) => `<li class="type ${type.type.name}">${type.type.name}</li>`) 
}


function convertPokemonToHtml (pokemon) {
    return `
        <li class="pokemon ${pokemon.types[0].type.name}">
            <div class="left-side">
                <h2 class="name">${pokemon.name}</h2>
                <ol class="types">
                    ${convertPokemonTypeToLi(pokemon.types).join('')}
                </ol>
            </div>
            <div class="right-side">
                <p id="${pokemon.id}" class="id">#${pokemon.id}</p>
                <img src="${pokemon.sprites.other.dream_world.front_default}" alt="${pokemon.name}">
            </div>
        </li>
    
    `
}


function loadPokemons (offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
            pokemonList.innerHTML += pokemons.map((pokemon) => convertPokemonToHtml(pokemon)).join('');
    })
}

loadPokemons(offset, limit);

loadMore.addEventListener('click', () => {
    offset += limit;

    const qntdAtualPokemons = offset + limit;

    if(qntdAtualPokemons >= qntdMaxPokemons){
        const newLimit = qntdMaxPokemons - offset;
        loadPokemons(offset, newLimit);

        loadMore.parentElement.removeChild(loadMore);
    }else {  
        loadPokemons(offset, limit)
    }
}) 