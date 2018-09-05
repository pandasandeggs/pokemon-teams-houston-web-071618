const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

let store = { trainers: [], pokemons: [] };
let trainerId = 0;
let pokemonId = 0;
let cardId = 0;

// When a user loads the page, they should see all
//   trainers, with their current team of Pokemon.
  // After DOMloads...
document.addEventListener('DOMContentLoaded', () => {

  document.querySelector(`main`).addEventListener('click',
  function(e){
      const releaseButtonClicked = e.target.className === 'release'
      if (releaseButtonClicked){
        e.target.parentElement.remove()
        deletePokemon(e.target.dataset.pokemonId);
      }
    }
  )

  document.querySelector(`main`).addEventListener('click', function(e){  // <-- listen on the parentElement
      if(e.target.id.includes("trainer")){
          addPokemon(e.target.dataset.trainerId)
      }
    }
  )

    function createTrainerCards(trainer){
      const trainerCardTemplate = `
          <div class="card" data-id=${cardId}><p>${trainer.name}</p>
            <button id="trainer-${trainer.id}" data-trainer-id="${trainer.id}">Add Pokemon</button>
              <ul>
              ${createPokemonList(trainer)}
              </ul>
          </div>`

      // console.log(trainerCardTemplate)
      const trainerCardDiv = document.createElement('div')
      document.querySelector('main').append(trainerCardDiv)
      trainerCardDiv.innerHTML = trainerCardTemplate
    }

    function createPokemonList(trainer){
      let pokemonLiString = ""

      trainer.pokemons.forEach(pokemon => {
          const pokemonListTemplate = `
            <li>${pokemon.nickname} (${pokemon.species})
              <button class="release" data-pokemon-id="${pokemon.id}">Release</button>
            </li>`
          pokemonLiString += pokemonListTemplate;
        }
      )
      return pokemonLiString
    }

    let promise = fetch(TRAINERS_URL)
    .then(response => response.json())
    .then(trainers => trainers.forEach(trainer => createTrainerCards(trainer)))

    function addPokemon(trainerId){
      fetch(POKEMONS_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
          body: JSON.stringify({trainer_id: trainerId})
        }
      )
      .then(response => response.json());
    }

    function deletePokemon(pokemon_id){
      fetch(`${POKEMONS_URL}/${pokemon_id}`, {
	      method: 'DELETE'
      })
    }


  }
)


  // let promise = fetch(TRAINERS_URL)
  // let anotherPromise = promise.then(function(response){
  //   return response.json()
  // })
  // anotherPromise.then(trainers => trainers.forEach(trainer => createTrainerCards(trainer)))

  //   if (trainers.length>0 ){

   // HTML: Trainers & Pokemons in Teams

// event listener!!!!
// Whenever a user hits `Add Pokemon` and they have
//   space on their team, they should get a new Pokemon.
  // if (teamSpace.length>6){
  //   addPokemon.addEventListener('click',function(event){
  //     --> fetch Pokemon from database
  //   }
  // }

// Whenever a user hits `Release Pokemon` on a specific
//   Pokemon team, that specific Pokemon should be released from
//   the team.
  //user clicks to delete pokemon from its team
//     releasePokemon.addEventListener('click',function(event){
//       --> teamSpace array clears that pokemons index
//     }
// }
