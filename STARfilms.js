import { films } from './films.js'

console.log('hello there')

let filmlist = document.querySelector('#filmList')








for (let i = 0; i < films.length; i++)
{
let figure = document.createElement('figure')
let figImg = document.createElement('img')
figImg.src = `https://starwars-visualguide.com/assets/img/films/${i + 1}.jpg`
let figCaption = document.createElement('figCaption')
figCaption.textContent = films[i].title

figure.appendChild(figImg)
figure.appendChild(figCaption)
filmlist.appendChild(figure)
}