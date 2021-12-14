import { senators } from '../Senators/senatorsdata.js'
import { representatives } from '../Senators/representatives.js'

const mainContent = document.querySelector('#main')
const members = [...senators, ...representatives]
const reps = [...representatives]
const sen = [...senators]
const senatorDiv = document.querySelector('.senators')
const representativeDiv = document.querySelector('.representatives')

const mainBody = document.querySelector('body')
const header = document.createElement('header')



const allSenatorsButton = document.createElement('button')
const loyaltyButton = document.createElement('button')
const repButton = document.createElement('button')
const loyalRepButton = document.createElement('button')
const repPartyButton = document.createElement('button')
const demPartyButton = document.createElement('button')
const refreshButton = document.createElement('button')

mainBody.appendChild(header)
loyaltyButton.textContent = 'Spineless Senators'
loyaltyButton.addEventListener('click', () => gridSenators(loyalSenator))
loyalRepButton.textContent = 'Spineless Representatives'
loyalRepButton.addEventListener('click', () => gridRepresentatives(loyalRep))
allSenatorsButton.textContent = 'All Senators'
allSenatorsButton.addEventListener('click', () => gridSenators(simplifiedMembers()))
repButton.textContent = 'All Representatives'
repButton.addEventListener('click', () => gridRepresentatives(simplifiedRepresentatives()))
repPartyButton.textContent = 'Republicans'
repPartyButton.addEventListener('click', () => gridSenators(filterSenators('party', 'R')))
demPartyButton.textContent = 'Democrats'
demPartyButton.addEventListener('click', () => gridSenators(filterSenators('party', 'D')))
refreshButton.textContent = 'Refresh'
refreshButton.addEventListener('click', () => refreshPage())

document.body.insertBefore(header, mainContent)
header.appendChild(allSenatorsButton)
header.appendChild(loyaltyButton)
header.appendChild(repButton)
header.appendChild(loyalRepButton)
header.appendChild(repPartyButton)
header.appendChild(demPartyButton)
header.appendChild(refreshButton)

function refreshPage(){
    window.location.reload();
} 

function simplifiedMembers(chamberFilter) {
    
const filteredArray =  sen.filter(member =>  chamberFilter ? member.short_title === chamberFilter : member)

        
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
function simplifiedMembers2(chamberMembers) {
    
    const filteredArray =  members.filter(member =>  chamberMembers ? member.short_title === chamberMembers : member)
    
            
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

function simplifiedRepresentatives(chamberReps) {
    

    const filteredArray =  reps.filter(member =>  chamberReps ? member.short_title === chamberReps : member)
    
            
        return filteredArray.map(representative => {
            let middleName = representative.middle_name ? ` ${representative.middle_name} `: ` `
            return {
                id: representative.id,
                name: `${representative.first_name}${middleName}${representative.last_name}`,
                party: representative.party,
                gender: representative.gender,
                seniority: +representative.seniority,
                imgURL: `https://www.govtrack.us/static/legislator-photos/${representative.govtrack_id}-100px.jpeg`,
                missedVotesPct: representative.missed_votes_pct,
                loyaltyPct: representative.votes_with_party_pct,
    
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

function gridRepresentatives(simpleRepresentatives) {
    
   

    simpleRepresentatives.forEach(representative => {
        const repFigure = document.createElement('figure')
        const figImg = document.createElement('img')
        const figCaption = document.createElement('figcaption')
    
        figImg.src = representative.imgURL
        figCaption.textContent = representative.name
    
        repFigure.appendChild(figImg)
        repFigure.appendChild(figCaption)
        representativeDiv.appendChild(repFigure)
    })
    }

const filterSenators = (prop, value) => 
    simplifiedMembers2().filter(members => members[prop] === value) 

    
console.log(filterSenators('party', 'R'))



const loyalRep = simplifiedRepresentatives().reduce((acc, rep) => {
    if (rep.loyaltyPct === 100) {
     acc.push(rep)   
    }
    return acc
    }, [])


   

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






