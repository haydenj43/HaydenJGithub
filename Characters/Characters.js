import { people } from '../Characters/people.js'

const mainContent = document.querySelector('#main')

const maleCharacters = people.filter(person => person.gender === 'male')
const femaleCharacters = people.filter(person => person.gender === 'female')
const otherCharacters = people.filter((person) => {
    if (person.gender === 'hermaphrodite' || person.gender === 'n/a' || person.gender === 'none') {
        return person
    }

})

const mainBody = document.querySelector('body')
const header = document.createElement('header')
const maleButton = document.createElement('button')
const femaleButton = document.createElement('button')

populateDOM(otherCharacters)

mainBody.appendChild(header)
maleButton.textContent = 'Male Characters'
maleButton.addEventListener('click', () => populateDOM(maleCharacters))
femaleButton.textContent = 'Female Characters'
femaleButton.addEventListener('click', () => populateDOM(femaleCharacters))
document.body.insertBefore(header, mainContent)
header.appendChild(maleButton)
header.appendChild(femaleButton)



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