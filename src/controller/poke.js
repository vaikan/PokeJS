/**
 * get Pokemon resource URI from the Pokedex and send it to getPokeDetails function
 * @param  {string}   name     name of the pokemon
 * @return {object}            pokemon details
 */
async function getPokemon(name) {
  if (localStorage.getItem("Pokedex") !== null) {
    $.snackbar({ content: "Pokedex present in Local Storage", timeout: 10000 });
    getRandomPokemon();
  } else {
    const url = "https://pokeapi.co/api/v2/pokedex/1";
    const pokedata = await fetch(url).then((response) => response.json());

    db.storeData(pokedata, "Pokedex");
    getRandomPokemon();
    // TODO: find a way to add all pokemon data into user stored db like indexed db.
  }
}

/**
 * gets Pokemon details from the Pokedex
 * @param  {string}   name      Pokemon resource URI
 * @return {Object}             Pokemon details
 */
function getPokeDetails(name) {
  pokemon.getData(name);
}

function getRandomPokemon() {
  const random1 = Math.floor(Math.random() * 721);
  const random2 = Math.floor(Math.random() * 721);
  const random3 = Math.floor(Math.random() * 721);

  const randomNumberArr = [random1, random2, random3];
  const pokemonList = db.getData("Pokedex");
  const pokeEntry = pokemonList.pokemon_entries;
  const data = [];

  for (let p in pokeEntry) {
    const pokeid = pokeEntry[p].entry_number;

    for (let num in randomNumberArr) {
      if (pokeid === randomNumberArr[num]) {
        data.push({
          pokeid: pokeid,
          name: pokeEntry[p].pokemon_species.name,
          url: pokeEntry[p].pokemon_species.url,
        });
      }
    }
  }
  setTemplate(data, "#pokemon-table", "random_pokemon_tmpl.hbs");
}

/**
 * set Pokemon template
 * @param {Object} data     Pokemon data
 * @param {String} table    template table name
 * @param {String} template template name
 */
function setTemplate(data, table, template) {
  $(table).empty();

  $.get(
    "../template/" + template,
    function (tmpl) {
      const handlebarTemplate = Handlebars.compile(tmpl);
      $(table).append(handlebarTemplate(data));
      $(table)
        .find("a")
        .click(function () {
          const name = $(this).data("name");
          pokemon.getData(name);
        });
    },
    "html"
  );
}
