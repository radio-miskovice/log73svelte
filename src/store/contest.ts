import { writable } from "svelte/store";


const lastContestName = localStorage.getItem('contest.name') || ''

const defaultTemplate = JSON.stringify({ 
  hasRst : true,
  hasSerial: true, 
  hasGrid: true,
  hasExch1: false, 
  hasExch2: false, 
  exch1Label: 'EXCHANGE1',
  exch1Width: 12,
  exch2Label: 'EXCHANGE2',
  exch2Width: 12
})

const lastContestTemplateString = localStorage.getItem('contest.setup') || defaultTemplate
const contestTemplate = JSON.parse(lastContestTemplateString)

export const hasRst    = writable(contestTemplate.hasRst)       // contest exchange includes RS/RST/RSQ etc.
export const hasSerial = writable(contestTemplate.hasSerial)    // contest exchange includes serial number 
export const hasGrid   = writable(contestTemplate.hasGrid)      // contest exchange includes WWLOC
export const hasExch1  = writable(contestTemplate.hasExch1)     // contest exchange includes fixed string 
export const hasExch2  = writable(contestTemplate.hasExch2)     // contest exchange includes fixed string

export const exch1Label = writable<string>(contestTemplate.exch1Label)
export const exch1Width = writable<number>(contestTemplate.exch1Width)
export const exch2Label = writable<string>(contestTemplate.exch2Label)
export const exch2Width = writable<number>(contestTemplate.exch2Width)
export const contestName = writable<string>(lastContestName)

hasRst.subscribe(hasRst => { contestTemplate.hasRst = hasRst; localStorage.setItem('contest.setup', JSON.stringify(contestTemplate)) })
hasSerial.subscribe(hasSerial => { contestTemplate.hasSerial = hasSerial; localStorage.setItem('contest.setup', JSON.stringify(contestTemplate)) })
hasGrid.subscribe(hasGrid => { contestTemplate.hasGrid = hasGrid; localStorage.setItem('contest.setup', JSON.stringify(contestTemplate)) })
hasExch1.subscribe(hasExch1 => { contestTemplate.hasExch1 = hasExch1; localStorage.setItem('contest.setup', JSON.stringify(contestTemplate)) })
hasExch2.subscribe(hasExch2 => { contestTemplate.hasExch2 = hasExch2; localStorage.setItem('contest.setup', JSON.stringify(contestTemplate)) })

exch1Label.subscribe( exch1Label => { contestTemplate.exch1Label = exch1Label ; localStorage.setItem( 'contest.setup', JSON.stringify( contestTemplate )) } )
exch1Width.subscribe( exch1Width => { contestTemplate.exch1Width = exch1Width ; localStorage.setItem( 'contest.setup', JSON.stringify( contestTemplate )) } )
exch2Label.subscribe( exch2Label => { contestTemplate.exch2Label = exch2Label ; localStorage.setItem( 'contest.setup', JSON.stringify( contestTemplate )) } )
exch2Width.subscribe( exch2Width => { contestTemplate.exch2Width = exch2Width ; localStorage.setItem( 'contest.setup', JSON.stringify( contestTemplate )) } )

contestName.subscribe( contestName => localStorage.setItem( 'contestName', contestName ))