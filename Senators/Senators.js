import { senators } from '../Senators/senatorsdata.js'
import { representatives } from '../Senators/representatives.js'

const mainContent = document.querySelector('#main')
const members = [...senators, ...representatives]

const senatorDiv = document.querySelector('.senators')
const loyaltyHeading = document.querySelector('.mostLoyal')
const mainBody = document.querySelector('body')
const header = document.createElement('header')
const maleCharacters = senators.filter(senator => senator.gender === 'M')
const femaleCharacters = senators.filter(senator => senator.gender === 'F')



const maleButton = document.createElement('button')
const femaleButton = document.createElement('button')



mainBody.appendChild(header)
maleButton.textContent = 'Male Politicians'
maleButton.addEventListener('click', () => gridSenators(maleCharacters))
femaleButton.textContent = 'Female Politicians'
femaleButton.addEventListener('click', () => simplifiedMembers(femaleCharacters))

document.body.insertBefore(header, mainContent)
header.appendChild(maleButton)
header.appendChild(femaleButton)


function simplifiedMembers(chamberFilter) {
    
const filteredArray =  members.filter(member =>  chamberFilter ? member.short_title === chamberFilter : member)

        
    return filteredArray.map(senator => {
        let middleName = senator.middle_name ? ` ${senator.middle_name} `: ` `
        return {
            id: senator.id,
            name: `${senator.first_name}${middleName}${senator.last_name}`,
            party: senator.party,
            gender: senator.gender,
            seniority: +senator.seniority,
            imgURL: `https://www.govtrack.us/static/legislator-photos/${senator.govtrack_id}-100px.jpeg`,
            missedVotesPct: senator.missed_votes_pct,
            loyaltyPct: senator.votes_with_party_pct,

        }
    })
}


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
    simplifiedMembers().filter(senator => senator[prop] === value) 

    
console.log(filterSenators('party', 'R'))




const loyalSenator = simplifiedMembers().reduce((acc, senator) => {
if (senator.loyaltyPct === 100) {
 acc.push(senator)   
}
return acc
}, [])

const cowardList = document.createElement('ol')

const cowards = loyalSenator.map(coward => {
    let listItem = document.createElement('li')
    listItem.textContent = coward.name
cowardList.appendChild(listItem)

})


loyaltyHeading.appendChild(cowardList)



gridSenators(simplifiedMembers())