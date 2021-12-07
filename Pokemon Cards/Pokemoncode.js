




function getAPIData(url) {
    try {
   return fetch(url).then((data) => data.json())
    } catch (error) {
console.error(error)
    }
    
}

function load(offset = 0, limit = 25) {
    
    getAPIData(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}
`).then(async (data) => {
    
    for (const pokemon of data.results){
       await getAPIData(pokemon.url).then(pokeData => populateCards(pokeData))
    }
    populateCards(data)
})
}


const pokeGrid = document.querySelector('.pokeGrid')
const loadButton = document.querySelector('.load')
loadButton.addEventListener('click', () => {
    
    load(0, 25)
})

const newButton = document.querySelector('.newPokemon')
newButton.addEventListener('click', () => {
    let pokeName = prompt('What is the name of your Pokemon?')
    let pokeHeight = prompt('What is the height of your Pokemon?')
    let pokeWeight = prompt('What is the weight of your Pokemon?')
    let pokeAbilities = prompt('What abilities does your Pokemon have?')
    let newPokemon = new Pokemon(pokeName, pokeHeight, pokeWeight, getAbilitiesArray(pokeAbilities))
    console.log(newPokemon) 
    populateCards(newPokemon)
})
function getAbilitiesArray(commaString) {
    let tempArray = commaString.split(',')
    console.log(tempArray)
    return tempArray.map((abilityName) => {
        return {
            ability:{
                name: abilityName
            }
        }
    })
}

const morePokemon = document.querySelector('.morePokemon')
morePokemon.addEventListener('click', () => {
    let startPoint = prompt('Which pokemon ID to start with?')
    let howMany = prompt('How many more Pokemon do you want?')
load(startPoint, howMany)
})


function populateCards(onepokemon) {
    const pokeFlip = document.createElement('div')
    pokeFlip.className = 'flip'
    const pokeCard = document.createElement('div')
    pokeCard.className = 'card'
    pokeCard.addEventListener('click', () => 
        pokeCard.classList.toggle('is-flipped')
    )
    const front = populateFront(onepokemon)
    const back = populateBack(onepokemon)
    const pokeBack = document.createElement('div')
    pokeBack.className = 'cardFace back'
    pokeBack.textContent = 'back'

    pokeCard.appendChild(front)
    pokeCard.appendChild(back)
    pokeFlip.appendChild(pokeCard)
    pokeGrid.appendChild(pokeFlip)
}

function populateFront(pokemon) {
    const pokeFront = document.createElement('figure')
    pokeFront.className = 'cardFace front'
    const pokeImg = document.createElement('img')
    if(pokemon.id === 900) {
        pokeImg.src = '../Pokemon Cards/pokeball.png'
    } else {
    pokeImg.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
    const pokeCaption = document.createElement('figcaption')
    pokeCaption.textContent = `${pokemon.id} ${pokemon.name}` 
    pokeFront.appendChild(pokeImg)
    pokeFront.appendChild(pokeCaption)
    return pokeFront
}
function populateBack(pokemon) {
    const pokeBack = document.createElement('div')
    pokeBack.className = 'cardFace back'
    const label = document.createElement('h4')
    label.textContent = 'Abilities:'
    const abilityList = document.createElement('ul')
    pokemon.abilities.forEach((ability) => {
        console.log(ability)
        let abilityItem = document.createElement('li')
        abilityItem.textContent = ability.ability.name
        abilityList.appendChild(abilityItem)
    })
    pokeBack.appendChild(label)
    pokeBack.appendChild(abilityList)
    return pokeBack

}


class Pokemon {
constructor(name, height, weight, abilities) {
    this.id = 900,
    this.name = name,
    this.height = height,
    this.weight = weight,
    this.abilities = abilities
}
}

