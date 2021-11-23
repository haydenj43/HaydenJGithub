import { senators } from '../Senators/senatorsdata.js'

const senatorDiv = document.querySelector('.senators')

function simplifiedSenators(senatorArray) {
    return senators.map(senator => {
        let middleName = senator.middle_name ? ` ${senator.middle_name} `: ` `
        return {
            id: senator.id,
            name: `${senator.first_name}${middleName}${senator.last_name}`,
            party: senator.party,
            gender: senator.gender,
            seniority: +senator.seniority,
            imgURL: `https://www.govtrack.us/static/legislator-photos/${senator.govtrack_id}-100px.jpeg`
        }
    })
}

gridSenators(simplifiedSenators(senators))

function gridSenators(simpleSenators) {
simpleSenators.forEach(senator => {
    const senFigure = document.createElement('figure')
    const figImg = document.createElement('img')
    const figCaption = document.createElement('figcaption')

    figImg.src = senator.imgURL
    figCaption.textContent = senator.name

    senFigure.appendChild(figImg)
    senFigure.appendChild(figCaption)
    senatorDiv.appendChild(senFigure)
})
}

const filterSenators = (prop, value) => 
    simplifiedSenators().filter(senator => senator[prop] === value) 

    
//console.log(filterSenators('party', 'R'))


const seniorSenator = simplifiedSenators().reduce((acc, senator) => {
  return acc.seniority > senator.seniority ? acc : senator 
})

console.log(seniorSenator)

gridSenators(simplifiedSenators())