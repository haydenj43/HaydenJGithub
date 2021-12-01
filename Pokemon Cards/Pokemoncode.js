async function getAPIData(url) {
    try {
        const response = await fetch(url)
const data = await response.json()
return data
} catch (error) {
console.error(error)
    }
    
}

getAPIData(`https://pokeapi.co/api/v2/pokemon/4
`).then((data) => {
    console.log(data)
    populateCards(data)
})

const pokeGrid = document.querySelector('.pokeGrid')


function populateCards(pokemon) {
    const pokeFlip = document.createElement('div')
    pokeFlip.className = 'flip'
    const pokeCard = document.createElement('div')
    pokeCard.className = 'card'
    const pokeFront = document.createElement('div')
    pokeFront.className = 'cardFace front'
    pokeFront.textContent = 'front'
    const pokeBack = document.createElement('div')
    pokeBack.className = 'cardFace back'
    pokeBack.textContent = 'back'

    pokeCard.appendChild(pokeFront)
    pokeCard.appendChild(pokeBack)
    pokeFlip.appendChild(pokeCard)
    pokeGrid.appendChild(pokeFlip)
}