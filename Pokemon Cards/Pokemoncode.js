async function getAPIData(url) {
    try {
        const response = await fetch(url)
console.log(response)
} catch (error) {
console.error(error)
    }
    
}

getAPIData(`https://pokeapi.co/api/v2/pokemon/ditto
`)