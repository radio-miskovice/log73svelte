import { writable } from "svelte/store";
import { db } from "./database";
import { errorMsg } from "./error";
import { mycall, mywwloc } from "./station";

/** */
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

interface IContest {
  id: string | null ;
  name: string ;
  nameExport?: string ;
  startDate?: Date ;
  endDate?: Date ;
  serial?: number ;
  hasRst: boolean ;
  hasSerial: boolean ;
  hasGrid: boolean ;
  hasExch1: boolean ;
  hasExch2: boolean ;
  exch1Label: string ;
  exch1Width: number ;
  exch1Sent: string ;
  exch2Label: string ;
  exch2Width: number ;
  exch2Sent: string ;
}

export interface IContestDatarecord extends IContest {
  mycall: string ;
  mywwloc?: string ;
  dateCreated: Date ;
  dateUpdated: Date ;
  dateClosed?: Date ;
}

const EMPTY_CONTEST : IContest = {
  id: null,
  name: '(no contest)',
  nameExport : '', 
  hasRst: true, 
  hasSerial: true, 
  hasGrid: false, 
  hasExch1: false,
  exch1Label: '',
  exch1Width: 0,
  exch1Sent: '',
  hasExch2: false, 
  exch2Label: '',
  exch2Width: 0,
  exch2Sent: ''
};

const CONTEST_ID          = 'contest.id' ; // database ID 
const CONTEST_ID_LATEST   = 'contest.id.latest' // latest non-zero contest ID
const CONTEST_NAME        = 'contest.name'; // contest name 
const CONTEST_NAME_EXPORT = 'contest.name.export'; // export name
const CONTEST_EXCH1_SENT  = 'contest.exch1.sent';  // exchange 1 sent
const CONTEST_EXCH2_SENT  = 'contest.exch2.sent';  // exchange 2 sent 
const CONTEST_START_DATE  = 'contest.start';  // start date 
const CONTEST_END_DATE    = 'contest.end';    // end date
const SERIAL_BY_BAND      = 'contest.serialbyband' ;  
const SERIAL_NUMBER       = 'contest.serial.single' ; // last serial number
const BAND_SERIALS        = 'contest.serials.band' ;

/** read last state from persistent memory */

const lastContestId = localStorage.getItem(CONTEST_ID) || null;
const lastContestIdLatest = localStorage.getItem(CONTEST_ID_LATEST) || null;
const lastContestName = localStorage.getItem(CONTEST_NAME) || ''
const lastContestExpName = localStorage.getItem(CONTEST_NAME_EXPORT) || ''
const lastSerialByBand : boolean = localStorage.getItem(SERIAL_BY_BAND) == 'false' 
const lastSerial : number | undefined =  parseInt(localStorage.getItem(SERIAL_NUMBER)) || undefined 
const lastExch1Sent = localStorage.getItem(CONTEST_EXCH1_SENT) || ''
const lastExch2Sent = localStorage.getItem(CONTEST_EXCH2_SENT) || ''
const lastUTCStart = localStorage.getItem(CONTEST_START_DATE)
const lastUTCEnd = localStorage.getItem(CONTEST_END_DATE)

const lastContestTemplateString = localStorage.getItem('contest.setup') || defaultTemplate
const contestTemplate = JSON.parse(lastContestTemplateString)

// these variables are necessary because writables value cannot be read :(

let currentContestId ;

export const contestId = writable<string>(lastContestId)
export const contestIdLatest = writable<string>(lastContestIdLatest)
// Contest configuration parameters
export const hasRst    = writable(contestTemplate.hasRst)       // contest exchange includes RS/RST/RSQ etc.
export const hasSerial = writable(contestTemplate.hasSerial)    // contest exchange includes serial number 
export const hasGrid   = writable(contestTemplate.hasGrid)      // contest exchange includes WWLOC
export const hasExch1  = writable(contestTemplate.hasExch1)     // contest exchange includes fixed string 
export const hasExch2  = writable(contestTemplate.hasExch2)     // contest exchange includes fixed string

export const hasSerialByBand = writable<boolean>( lastSerialByBand ) 
export const serialNumber = writable<number>( lastSerial )

export const exch1Label = writable<string>(contestTemplate.exch1Label)
export const exch1Width = writable<number>(contestTemplate.exch1Width)
export const exch2Label = writable<string>(contestTemplate.exch2Label)
export const exch2Width = writable<number>(contestTemplate.exch2Width)
export const contestName = writable<string>(lastContestName)
export const contestNameExport = writable<string>(lastContestExpName)
// constant exchanges
export const exch1Sent = writable<string>(lastExch1Sent)
export const exch2Sent = writable<string>(lastExch2Sent)

export const startUtc = writable<Date>(lastUTCStart ? new Date(lastUTCStart) : undefined)
export const endUtc   = writable<Date>(lastUTCEnd ? new Date(lastUTCEnd) : null )

export const callsign = writable<string>('')
export const rstR = writable<string>('')
export const rstS = writable<string>('')
export const serialR = writable<string>('')
export const gridR = writable<string>('')
export const exch1R  = writable<string>('')
export const exch2R = writable<string>('')

contestId.subscribe(value => {
  if( value ) localStorage.setItem(CONTEST_ID, value);
  else localStorage.removeItem(CONTEST_ID);
})

contestId.subscribe( value => { currentContestId = value });

contestIdLatest.subscribe(value => {
  if( value ) localStorage.setItem(CONTEST_ID_LATEST, value);
  else localStorage.removeItem(CONTEST_ID_LATEST);
})

hasRst.subscribe(value => { contestTemplate.hasRst = value; localStorage.setItem('contest.setup', JSON.stringify(contestTemplate)) })
hasSerial.subscribe(value => { contestTemplate.hasSerial = value; localStorage.setItem('contest.setup', JSON.stringify(contestTemplate)) })
hasGrid.subscribe(value => { contestTemplate.hasGrid = value; localStorage.setItem('contest.setup', JSON.stringify(contestTemplate)) })
hasExch1.subscribe(value => { contestTemplate.hasExch1 = value; localStorage.setItem('contest.setup', JSON.stringify(contestTemplate)) })
hasExch2.subscribe(value => { contestTemplate.hasExch2 = value; localStorage.setItem('contest.setup', JSON.stringify(contestTemplate)) })

hasSerialByBand.subscribe( value => localStorage.setItem( SERIAL_BY_BAND, value ? 'true' : 'false' ))
serialNumber.subscribe( value => {
  if( value ) {
    localStorage.setItem( SERIAL_NUMBER, value.toString());
    if( currentContestId ) {
      updateContest( currentContestId, { serial: value })
    }
  }
})

exch1Label.subscribe( value => { contestTemplate.exch1Label = value ; localStorage.setItem( 'contest.setup', JSON.stringify( contestTemplate )) } )
exch1Width.subscribe( value => { contestTemplate.exch1Width = value ; localStorage.setItem( 'contest.setup', JSON.stringify( contestTemplate )) } )
exch2Label.subscribe( value => { contestTemplate.exch2Label = value ; localStorage.setItem( 'contest.setup', JSON.stringify( contestTemplate )) } )
exch2Width.subscribe( value => { contestTemplate.exch2Width = value ; localStorage.setItem( 'contest.setup', JSON.stringify( contestTemplate )) } )

contestName.subscribe( value => localStorage.setItem('contest.name', value))
contestNameExport.subscribe(value => localStorage.setItem('contest.name.export', value))

// UPDATE contest record if necessary
mywwloc.subscribe(wwlocUpdated => {
  if (currentContestId != null && currentContestId != undefined) {
    updateContest(currentContestId, { mywwloc: wwlocUpdated });
  }
})

mycall.subscribe(mycallUpdated => {
  if (currentContestId != null && currentContestId != undefined) {
    updateContest(currentContestId, { mycall: mycallUpdated });
  }
})

exch1Sent.subscribe(value => {
  if( value ) localStorage.setItem(CONTEST_EXCH1_SENT, value);
  else localStorage.removeItem(CONTEST_EXCH1_SENT);
})

exch2Sent.subscribe(value => {
  if( value ) localStorage.setItem(CONTEST_EXCH2_SENT, value);
  else localStorage.removeItem(CONTEST_EXCH2_SENT);
})

startUtc.subscribe(value => {
  if (value) localStorage.setItem(CONTEST_START_DATE, value.toISOString());
  else localStorage.removeItem(CONTEST_START_DATE);

})

endUtc.subscribe(value => { 
  if (value) localStorage.setItem(CONTEST_END_DATE, value.toISOString());
  else localStorage.removeItem(CONTEST_END_DATE);
})

export function activateContest(contest: IContest, mycall: string, mywwloc?: string) {
  const now = new Date();
  const id = 'C' + now.valueOf().toString(36);
  const newContest: IContestDatarecord = {
    ...contest, id, mycall, mywwloc, dateCreated: now, dateUpdated: now, serial: 1
  };
  endUtc.set( null );
  db.contest.add(newContest, id).then(
    (result) => {
      // result should be identical to id 
      console.log('New contest added: ', id, ' / ', result);
      contestId.set(id);
      contestIdLatest.set(id);
      serialNumber.set(1);
    }
  ).catch(error => {
    console.log(error);
    let em = 'DB error: ' + error.toString()
    errorMsg.set(em);
  });
}

export function updateContest(id: string, data: any ) {
  // TODO: update database record 
  db.contest.update( id, data ).then(
    updated => {
      console.log( `Contest: ${updated} records updated`);
    }
  )
}

export function reloadContest( id: string ) {
  console.log(`Would reactivate contest ${id} if exists in database`);
  db.contest.get(id)
    .then(  ( r ) => {
      if( r ) {
        contestId.set(r.id)
        contestIdLatest.set(r.id)
        contestName.set(r.name)
        contestNameExport.set(r.nameExport || '')
        exch1Label.set(r.exch1Label)
        exch1Width.set(r.exch1Width)
        exch1Sent.set(r.exch1Sent)
        exch2Label.set(r.exch2Label)
        exch2Width.set(r.exch2Width)
        exch2Sent.set(r.exch2Sent)
        hasExch1.set(r.hasExch1)
        hasExch2.set(r.hasExch2)
        hasGrid.set(r.hasGrid)
        hasRst.set(r.hasRst)
        hasSerial.set(r.hasSerial)
        mycall.set(r.mycall)
        mywwloc.set(r.mywwloc)
        serialNumber.set(r.serial || 1)
        startUtc.set( r.startDate )
        if( r.dateClosed ) endUtc.set( r.dateClosed ) ;
        else endUtc.set( null );
      }
      else {
        errorMsg.set( 'Contest not found in database')
      }
  });
}