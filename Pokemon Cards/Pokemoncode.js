




function getAPIData(url) {
    try {
   return fetch(url).then((data) => data.json())
    } catch (error) {
console.error(error)
    }
    
}

function load(offset = 0, limit = 30) {
    
    getAPIData(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}
`).then(async (data) => {
    
    for (const pokemon of data.results){
       await getAPIData(pokemon.url).then(pokeData => populateCards(pokeData))
    }
    populateCards(data)
})
}

function shiny(offset = 0, limit = 30) {
    
    getAPIData(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}
`).then(async (data) => {
    
    for (const pokemon of data.results){
       await getAPIData(pokemon.url).then(pokeData => shinyCards(pokeData))
    }
    shinyCards(data)
})
}

const pokeGrid = document.querySelector('.pokeGrid')
const loadButton = document.querySelector('.load')
loadButton.addEventListener('click', () => {
    
    load(0, 30)
})

const shinyButton = document.querySelector('.shinyPokemon')
shinyButton.addEventListener('click', () => {
    
    shiny(0, 30)
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

function shinyCards(oneepokemon) {
    const shinyFlip = document.createElement('div')
    shinyFlip.className = 'flip'
    const shinyCard = document.createElement('div')
    shinyCard.className = 'card'
    shinyCard.addEventListener('click', () => 
        shinyCard.classList.toggle('is-flipped')
    )
    const shinyfront = populateShiny(oneepokemon)
    const back = populateBack(oneepokemon)
    
    const pokeBack = document.createElement('div')
    
    pokeBack.className = 'cardFace back'
    pokeBack.textContent = 'back'

    shinyCard.appendChild(shinyfront)
    shinyCard.appendChild(back)
    shinyFlip.appendChild(shinyCard)
    pokeGrid.appendChild(shinyFlip)
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
    pokeCaption.textContent = `${pokemon.name}` 
    pokeFront.appendChild(pokeImg)
    pokeFront.appendChild(pokeCaption)
    return pokeFront
}

function populateShiny(pokemon) {
    const shinyFront = document.createElement('figure')
    shinyFront.className = 'cardFace shiny'
    const shinyImg = document.createElement('img')
    if(pokemon.id === 900) {
        shinyImg.src = '../Pokemon Cards/pokeball.png'
    } else {
    shinyImg.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${pokemon.id}.png`}
    const shinyCaption = document.createElement('shinycaption')
    shinyCaption.textContent = `${pokemon.name}` 
    shinyFront.appendChild(shinyImg)
    shinyFront.appendChild(shinyCaption)
    return shinyFront
}


function populateBack(pokemon) {
    const pokeBack = document.createElement('div')
    pokeBack.className = 'cardFace back'
    const label = document.createElement('h4')
    label.textContent = 'Type:'
    const typeList = document.createElement('h1')
    pokemon.types.forEach((type) => {
        console.log(type)
        let typeItem = document.createElement('h1')
        typeItem.textContent = type.type.name
        typeList.appendChild(typeItem)
    })
    pokeBack.appendChild(label)
    pokeBack.appendChild(typeList)


    typesBackground(pokemon, pokeBack) 

    return pokeBack
    
    
}
function typesBackground(pokemon, card) {
    let pokeType1 = pokemon.types[0].type.name
    let poketype2 = pokemon.types[1]?.type.name
    if (!poketype2) {
        card.style.setProperty('background', getPokeTypeColor(pokeType1))
    } else {
        card.style.setProperty('background', `linear-gradient(${getPokeTypeColor(pokeType1)}, ${getPokeTypeColor(poketype2)})`)
    }
}

function getPokeTypeColor(pokeType) {
let color
switch (pokeType) {
    case 'grass':
    color = '#40b088'
    break
    case 'poison':
        color = '#b70df2'
        break
    case 'fire':
        color = '#f73718'
        break
        case 'normal':
        color = '#a8a77a'
        break
        case 'water':
            color = '#6390f0'
            break
            case 'electric':
         color = '#f7d02c'
            break
            case 'ice':
                color = '#96d9d6'
                break
                case 'fighting':
                    color = '#c22e28'
                    break
                    case 'ground':
                        color = '#e2bf65'
                        break
                        case 'flying':
                            color = '#a98ff3'
                            break
                            case 'psychic':
                                color = '#f95587'
                                break
                                case 'bug':
                                    color = '#a6b91a'
                                    break
                                    case 'rock':
                color = '#b6a136'
                break
                case 'ghost':
                    color = '#735797'
                    break
                    case 'dragon':
                color = '#6f35fc'
                break
                case 'dark':
                    color = '#705746'
                    break
                    case 'steel':
                color = '#b7b7ce'
                break
                case 'fairy':
                    color = '#d685ad'
                    break



}
return color
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

