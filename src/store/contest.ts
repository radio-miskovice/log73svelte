import { writable } from "svelte/store";


const CONTEST_NAME = 'contest.name';
const CONTEST_NAME_EXPORT = 'contest.name.export';
const CONTEST_EXCH1_SENT = 'contest.exch1.sent';
const CONTEST_EXCH2_SENT = 'contest.exch2.sent';

const lastContestName = localStorage.getItem(CONTEST_NAME) || ''
const lastContestExpName = localStorage.getItem(CONTEST_NAME_EXPORT) || ''
const lastExch1Sent = localStorage.getItem(CONTEST_EXCH1_SENT) || ''
const lastExch2Sent = localStorage.getItem(CONTEST_EXCH2_SENT) || ''

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
export const contestNameExport = writable<string>(lastContestExpName)

export const exch1Sent = writable<string>(lastExch1Sent)
export const exch2Sent = writable<string>(lastExch2Sent)

hasRst.subscribe(value => { contestTemplate.hasRst = value; localStorage.setItem('contest.setup', JSON.stringify(contestTemplate)) })
hasSerial.subscribe(value => { contestTemplate.hasSerial = value; localStorage.setItem('contest.setup', JSON.stringify(contestTemplate)) })
hasGrid.subscribe(value => { contestTemplate.hasGrid = value; localStorage.setItem('contest.setup', JSON.stringify(contestTemplate)) })
hasExch1.subscribe(value => { contestTemplate.hasExch1 = value; localStorage.setItem('contest.setup', JSON.stringify(contestTemplate)) })
hasExch2.subscribe(value => { contestTemplate.hasExch2 = value; localStorage.setItem('contest.setup', JSON.stringify(contestTemplate)) })

exch1Label.subscribe( value => { contestTemplate.exch1Label = value ; localStorage.setItem( 'contest.setup', JSON.stringify( contestTemplate )) } )
exch1Width.subscribe( value => { contestTemplate.exch1Width = value ; localStorage.setItem( 'contest.setup', JSON.stringify( contestTemplate )) } )
exch2Label.subscribe( value => { contestTemplate.exch2Label = value ; localStorage.setItem( 'contest.setup', JSON.stringify( contestTemplate )) } )
exch2Width.subscribe( value => { contestTemplate.exch2Width = value ; localStorage.setItem( 'contest.setup', JSON.stringify( contestTemplate )) } )

contestName.subscribe( value => localStorage.setItem('contest.name', value))
contestNameExport.subscribe(value => localStorage.setItem('contest.name.export', value))

exch1Sent.subscribe(value => localStorage.setItem(CONTEST_EXCH1_SENT, value))
exch2Sent.subscribe(value => localStorage.setItem(CONTEST_EXCH2_SENT, value))