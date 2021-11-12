import { people } from '../Characters/people.js'

const mainContent = document.querySelector('#main')
const mainBody = document.querySelector('body')
const header = document.createElement('header')
const maleButton = document.createElement('button')
const femaleButton = document.createElement('button')
header.appendChild(maleButton)
header.appendChild(femaleButton)
mainBody.appendChild(header)
maleButton.textContent = 'Male Characters'
femaleButton.textContent = 'Female Characters'

document.body.insertBefore(header, mainContent)

const maleCharacters = people.filter(person => person.gender === 'male')
const femaleCharacters = people.filter(person => person.gender === 'female')
console.log(maleCharacters)

people.forEach((element, index) => {

    const charFigure = document.createElement('figure')
    const charImg = document.createElement('img')

    charImg.src = `https://starwars-visualguide.com/assets/img/characters/${index + 1}.jpg`
    const charCaption = document.createElement('figcaption')
    charCaption.textContent = element.name

    charFigure.appendChild(charImg)
    mainContent.appendChild(charFigure)
    charFigure.appendChild(charCaption)

})