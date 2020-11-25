const pokemon = {
  getData: (id) => {
    pokeDB.fetchData(id, "pokemon", async (pokedata) => {
      if (pokedata === undefined) {
        const pokespecies = await fetch(
          "https://pokeapi.co/api/v2/pokemon-species/" + id
        ).then((response) => response.json());
        const poke = await fetch(
          "https://pokeapi.co/api/v2/pokemon/" + id
        ).then((response) => response.json());

        let evolves_from, habitat;

        if (pokespecies.evolves_from_species === null) {
          evolves_from = "N/A";
        } else {
          evolves_from = pokespecies.evolves_from_species.name;
        }

        if (pokespecies.habitat === null) {
          habitat = "N/A";
        } else {
          habitat = pokespecies.habitat.name;
        }

        var res = {
          color: pokespecies.color.name,
          evolves_from: evolves_from,
          desc: pokespecies.flavor_text_entries[1].flavor_text,
          genus: pokespecies.genera[0].genus,
          generation: pokespecies.generation.name,
          habitat: habitat,
          id: pokespecies.id,
          name: pokespecies.name,
          shape: pokespecies.shape.name,
          evolution_chain: pokespecies.evolution_chain.url,
          abilities: poke.abilities,
          base_experience: poke.base_experience,
          height: poke.height,
          moves: poke.moves,
          sprite: poke.sprites.other["official-artwork"].front_default,
          stats: poke.stats,
          types: poke.types,
          weight: poke.weight,
        };
        //console.log(res);
        pokeDB.createData(res, "pokemon");
        //pokeDB.countObjStoreData('pokemon');
        setTemplate(res, "#pokedex-table", "poke-tmpl.hbs");
      } else {
        setTemplate(pokedata, "#pokedex-table", "poke-tmpl.hbs");
      }
    });
  },
};
