var pokemon = {
  getData : function(id) {
    pokeDB.fetchPokemon(id, function(pokedata){
      if (pokedata === undefined) {
        $.ajax({
          url: 'http://pokeapi.co/api/v2/pokemon-species/'+id,
          type: 'GET',
          error: function(jqXHR, textStatus, errorThrown) {
            if (textStatus === 'error') {
              console.log(textStatus);
            }
          },
          success: function(data) {
            var pokespecies = data;
            $.ajax({
              url: 'http://pokeapi.co/api/v2/pokemon/'+id,
              type: 'GET',
              error: function(jqXHR, textStatus, errorThrown) {
                if (textStatus === 'error') {
                  console.log(textStatus);
                }
              },
              success: function(data1) {
                var poke = data1;
                var evolves_from;
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
                  sprite: poke.sprites.front_default,
                  stats: poke.stats,
                  types: poke.types,
                  weight: poke.weight
                };
                //console.log(res);
                pokeDB.createPokemon(res);
                setPokedexTemplate(res);
              }
            });
          }
        });
      } else {
        setPokedexTemplate(pokedata);
      }
    });
  }
};
