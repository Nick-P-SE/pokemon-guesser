//Example fetch using pokemonapi.co
document.querySelector('button.reroll').addEventListener('click', reroll) 
document.querySelector('button.hint').addEventListener('click', getHint) 
document.querySelector('button.guess').addEventListener('click', guess) 
document.querySelector('button.giveUpButton').addEventListener('click', giveUp) 


let pokemon
function getFetch(){
  const randPokeNumb = Math.floor(Math.random() * 1126)
  const url = 'https://pokeapi.co/api/v2/pokemon/' + randPokeNumb
  const url2 ='https://pokeapi.co/api/v2/pokemon-species/'+ randPokeNumb
         
  fetch(url)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
        console.log(data)


        let abilities = ''
        for(let i = 0 ; i < data.abilities.length ; i++){
          if (i === 0){
            abilities = data.abilities[i].ability.name
          }else if(i > 0 && data.abilities[i].is_hidden === false){
            abilities = `${abilities} and ${data.abilities[i].ability.name}`
          } else if(i > 0 && data.abilities[i].is_hidden === true){
            abilities = `${abilities} with ${data.abilities[i].ability.name} as its hidden ability`
          }
        }
        document.querySelector('li.abilities').innerHTML = `The Pokemon's possible abilities are: ${abilities}`


        let gameVersions = ''
        for(let i = 0 ; i < data.game_indices.length ; i++){
          if (i === 0){
            gameVersions = data.game_indices[i].version.name
          }else if(i > 0){
            gameVersions = `${gameVersions}, ${data.game_indices[i].version.name}`
          }
        }
        document.querySelector('li.games').innerHTML = `This Pokemon can be found in all of the following games: ${gameVersions}`


        


        if(data.types.length === 1){
          document.querySelector('li.types').innerHTML = `This Pokemon's typing is ${data.types[0].type.name}`
        } else if(data.types.length > 1){
          document.querySelector('li.types').innerHTML = `This Pokemon's typing is ${data.types[0].type.name}/${data.types[1].type.name}`
        }
        

        if(data.sprites.front_default !== null && data.sprites.front_female !== null){
          document.querySelector('.genderForms').innerHTML = `This Pokemon has a different appearence depending on its gender`
        } else{
          document.querySelector('.genderForms').innerHTML = `This Pokemon only has one form for both genders (or cannot have a gender)`
        }

        let name = data.name
        pokemon = name
        document.querySelector('.name').innerHTML = name


        document.querySelector('img').src = data.sprites.front_default
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
  fetch(url2)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      console.log(data)

      document.querySelector('li.color').innerHTML = `This Pokemon is mostly ${data.color.name}`

      document.querySelector('li.dexNumb').innerHTML = `This Pokemon's National Dex number is ${data.pokedex_numbers[0].entry_number}`

      if(data.egg_groups.length === 1){
        document.querySelector('li.eggGroups').innerHTML = `This Pokemon is a part of the ${data.egg_groups[0].name} egg group`
      }else if (data.egg_groups.length )
        document.querySelector('li.eggGroups').innerHTML = `This Pokemon is a part of the ${data.egg_groups[0].name} and ${data.egg_groups[1].name} egg groups`

      if(data.is_legendary){
        document.querySelector('li.legendary').innerHTML = `This Pokemon is considered a legendary`
      }else{
        document.querySelector('li.legendary').innerHTML = `This Pokemon is NOT a legendary`
      }

      if(data.habitat !== null){
        document.querySelector('li.habitat').innerHTML = `This Pokemon's habitat is ${data.habitat.name}`
      } else{
        `This Pokemon's habitat is either unknown or not specified (could be a legendary)`
      }
    })
    .catch(err => {
      console.log(`error ${err}`)
    });
}
getFetch()




let array = [0,1,2,3,4,5,6,7,8]
function shuffle(array) {
  let currentIndex = array.length,  randomIndex;
  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}
shuffle(array)
let k = 0
function getHint(){
    if(k <= 8){
      document.querySelector(`.hint${array[k]}`).classList.toggle('hidden')
      k++
    }else if(k === 9){
      document.querySelector(`.giveUp`).classList.toggle('hidden')
      k++
    }
}
  


function guess(){
  let pokeGuess = document.querySelector('input').value.toLowerCase()
  if(pokeGuess === pokemon){
    document.querySelector('#result').innerHTML = 'Correct'
    document.querySelector('.hint0').classList.remove('hidden')
    document.querySelector('.hint1').classList.remove('hidden')
    document.querySelector('.hint2').classList.remove('hidden')
    document.querySelector('.hint3').classList.remove('hidden')
    document.querySelector('.hint4').classList.remove('hidden')
    
    document.querySelector('img').classList.remove('hidden')
    document.querySelector('.name').classList.remove('hidden')
  } else if(pokeGuess !== pokemon){
    document.querySelector('#result').innerHTML = 'WRONG'
  }
}


function giveUp(){
  document.querySelector('img').classList.remove('hidden')
  document.querySelector('.name').classList.remove('hidden')
  document.querySelector('#result').innerHTML = ''

}


function reroll(){
  getFetch()
  k = 0
  document.querySelector('.hint0').classList.add('hidden')
  document.querySelector('.hint1').classList.add('hidden')
  document.querySelector('.hint2').classList.add('hidden')
  document.querySelector('.hint3').classList.add('hidden')
  document.querySelector('.hint4').classList.add('hidden')
  document.querySelector('.hint5').classList.add('hidden')
  document.querySelector('.hint6').classList.add('hidden')
  document.querySelector('.hint7').classList.add('hidden')
  document.querySelector('.hint8').classList.add('hidden')
  document.querySelector('.giveUp').classList.add('hidden') 
  document.querySelector('img').classList.add('hidden')
  document.querySelector('.name').classList.add('hidden')
  document.querySelector('#result').innerHTML = ''
}