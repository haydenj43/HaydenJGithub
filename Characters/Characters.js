import { people } from '../Characters/people.js'
import { species } from '../Characters/species.js'
import { vehicles } from '../Characters/vehicles.js'
import { starships } from '../Characters/starships.js'

const mainContent = document.querySelector('#main')

const maleCharacters = people.filter(person => person.gender === 'male')
const femaleCharacters = people.filter(person => person.gender === 'female')

const fatSlugAndRobots = people.filter((person) => {
    if (person.gender === 'hermaphrodite' || person.gender === 'n/a' || person.gender === 'none') {
        return person
    }

})

const mainBody = document.querySelector('body')

const header = document.createElement('header')
const maleButton = document.createElement('button')
const femaleButton = document.createElement('button')
const otherButton = document.createElement('button')
const speciesButton = document.createElement('button')
const shipButton = document.createElement('button')
const starButton = document.createElement('button')
const homeButton = document.createElement('button')
populateDOM(people)



function play() {
    var audio = document.getElementById("audio");
    audio.play();
  }
  function play3() {
    var audio = document.getElementById("audio3");
    audio.play();
  }
  function play2() {
    var audio = document.getElementById("audio2");
    audio.play();
  }

  function play4() {
    var audio = document.getElementById("audio4");
    audio.play();
  }
  function play5() {
    var audio = document.getElementById("audio5");
    audio.play();
  }
  function play6() {
    var audio = document.getElementById("audio6");
    audio.play();
  }

mainBody.appendChild(header)
otherButton.textContent = 'Fat Slug and Droids'
otherButton.addEventListener('click', () => populateDOM(fatSlugAndRobots))
otherButton.addEventListener('click', () => play3(audio3))
maleButton.textContent = 'Male Characters'
maleButton.addEventListener('click', () => populateDOM(maleCharacters))
maleButton.addEventListener('click', () => play(audio))
starButton.addEventListener('click', () => play4(audio4))
femaleButton.textContent = 'Female Characters'
femaleButton.addEventListener('click', () => populateDOM(femaleCharacters))
femaleButton.addEventListener('click', () => play2(audio2))
speciesButton.textContent = 'Species'
speciesButton.addEventListener('click', () => populateSpecies(species))
shipButton.textContent = 'Vehicles'
shipButton.addEventListener('click', () => populateVehicles(vehicles))
shipButton.addEventListener('click', () => play5(audio5))
starButton.textContent = 'Starships'
starButton.addEventListener('click', () => populateShips(starships))
homeButton.textContent = 'Hyperspace to Home'
homeButton.addEventListener('click',  () => window.location.href = "https://zealous-wright-e0e7c0.netlify.app/index.html")
speciesButton.addEventListener('click', () => play6(audio6))
document.body.insertBefore(header, mainContent)
header.appendChild(maleButton)
header.appendChild(femaleButton)
header.appendChild(otherButton)
header.appendChild(speciesButton)
header.appendChild(shipButton)
header.appendChild(starButton)
header.appendChild(homeButton)




function populateSpecies(species) {
    while (mainContent.firstChild) {
        mainContent.removeChild(mainContent.firstChild)
    }
    species.forEach((element) => {

        const charFigure = document.createElement('figure')
        const charImg = document.createElement('img')
        const charNum = getLastNumber(element.url)
        charImg.src = `https://starwars-visualguide.com/assets/img/species/${charNum}.jpg`
        const charCaption = document.createElement('figcaption')
        charCaption.textContent = element.name

        charFigure.appendChild(charImg)
        mainContent.appendChild(charFigure)
        charFigure.appendChild(charCaption)

    })
}

function populateVehicles(vehicles) {  
    while (mainContent.firstChild) {
        mainContent.removeChild(mainContent.firstChild)
    }
    vehicles.forEach((element) => {

        const charFigure = document.createElement('figure')
        const charImg = document.createElement('img')
        const charNum = getLastNumber(element.url)
        charImg.src = `https://starwars-visualguide.com/assets/img/vehicles/${charNum}.jpg`
        const charCaption = document.createElement('figcaption')
        charCaption.textContent = element.name

        charFigure.appendChild(charImg)
        mainContent.appendChild(charFigure)
        charFigure.appendChild(charCaption)
       
    }) 
}


function populateShips(ships) {  
    while (mainContent.firstChild) {
        mainContent.removeChild(mainContent.firstChild)
    }
    ships.forEach((element) => {

        const charFigure = document.createElement('figure')
        const charImg = document.createElement('img')
        const charNum = getLastNumber(element.url)
        charImg.src = `https://starwars-visualguide.com/assets/img/starships/${charNum}.jpg`
        const charCaption = document.createElement('figcaption')
        charCaption.textContent = element.name

        charFigure.appendChild(charImg)
        mainContent.appendChild(charFigure)
        charFigure.appendChild(charCaption)
       
    }) 
}

function populateDOM(characters) {
    while (mainContent.firstChild) {
        mainContent.removeChild(mainContent.firstChild)
    }
    characters.forEach((element) => {

        const charFigure = document.createElement('figure')
        const charImg = document.createElement('img')
        const charNum = getLastNumber(element.url)
        charImg.src = `https://starwars-visualguide.com/assets/img/characters/${charNum}.jpg`
        const charCaption = document.createElement('figcaption')
        charCaption.textContent = element.name

        charFigure.appendChild(charImg)
        mainContent.appendChild(charFigure)
        charFigure.appendChild(charCaption)

    })
}

function getLastNumber(url) {
    let end = url.lastIndexOf('/')
    let start = end - 2

    if (url.charAt(start) === '/') {
        start++
    }
    return url.slice(start, end)

}