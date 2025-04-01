// pokemon search tool to look up Pokemon
const searchButton = document.getElementById('searchButton');
const pokemonInput = document.getElementById('pokemonInput');
const pokemonDisplay = document.getElementById('pokemonDisplay');

searchButton.addEventListener('click', async () => {
    event.preventDefault();
    const query = pokemonInput.value.trim().toLowerCase();
    if (!query) {
        alert('Please enter a Pokémon name or ID!');
        return;
    }

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
        if (!response.ok) {
            throw new Error('Pokémon not found!');
        }

        const pokemonData = await response.json();
        displayPokemon(pokemonData);
    } catch (error) {
        pokemonDisplay.innerHTML = `<p>Error: ${error.message}</p>`;
    }
});

function displayPokemon(data) {
    pokemonDisplay.innerHTML = `
        <div class="d-flex justify-content-center mt-4">
            <div class="card">
                <img src="${data.sprites.front_default}" class="card-img-top" alt="${data.name}">
                <div class="card-body">
                    <h5 class="card-title">${capitalize(data.name)} (#${data.id})</h5>
                    <p class="card-text"><strong>Type:</strong> ${data.types.map(type => capitalize(type.type.name)).join(', ')}</p>
                    <p class="card-text"><strong>Abilities:</strong> ${data.abilities.map(ability => capitalize(ability.ability.name)).join(', ')}</p>
                    <p class="card-text"><strong>Base Stats:</strong></p>
                    <ul class="list-group">
                        ${data.stats.map(stat => `<li class="list-group-item">${capitalize(stat.stat.name)}: ${stat.base_stat}</li>`).join('')}
                    </ul>
                    <p class="card-text"><strong>Height:</strong> ${data.height / 10} m</p>
                    <p class="card-text"><strong>Weight:</strong> ${data.weight / 10} kg</p>
                </div>
            </div>
        </div>
    `;
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}