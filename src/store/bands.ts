import { writable } from "svelte/store"

const CURRENT_BAND = 'currentBand'
const SELECTED_BANDS = 'selectedBands'

export const VLF_BAND = 'vlf'
export const LF_BAND = 'lf'
export const MF_BAND = 'mf'
export const HF_BAND = 'hf'
export const VHF_BAND = 'vhf'
export const UHF_BAND = 'uhf'
export const SHF_BAND = 'shf'
export const EHF_BAND = 'ehf'

export type FrequencyClass = typeof VLF_BAND | typeof LF_BAND 
  | typeof MF_BAND | typeof HF_BAND | typeof VHF_BAND 
  | typeof UHF_BAND | typeof SHF_BAND | typeof EHF_BAND 

export interface IBand {
  id: string ;         // basic band identifier (ADIF compliant)
  alt: string ;        // alternative identifier (based on frequency)
  rc: FrequencyClass ; // Range Category ()
  ct: boolean ;        // Contestable Flag - true if contesting is possible on this band
  range: number[] ;    // Maximum possible frequency range (worldwide) in KHz
}

export interface SelectableBand {
  band: IBand,
  selected: boolean
}


/**
 * rc - range class (vlf, lf, mf, hf, etc.)
 * range - approximate maximum frequency range in KHz
 */
export const ALL_BANDS : IBand[] = [
  { id: '2190m', alt: '136 KHz', rc: 'lf', ct: false, range: [135, 138] },
  { id: '631m',  alt: '475 KHz',  rc: 'lf' , ct: false, range: [472, 479] },
  { id: '560m',  alt: '500 KHz',  rc: 'lf', ct: false, range: [501, 505] },
  { id: '160m',  alt: '1.8 MHz',  rc: 'hf', ct: true, range:[ 1750, 2000] },
  { id: '80m',  alt: '3.5 MHz', rc: 'hf', ct: true, range: [3500, 4000] },
  { id: '60m',  alt: '5.3 MHz', rc: 'hf', ct: false, range: [5300, 5450] },
  { id: '40m',  alt: '7 MHz',   rc: 'hf', ct: true, range: [7000, 7300] },
  { id: '30m',  alt: '10.1 MHz', rc: 'hf', ct: false, range: [10100, 10150] },
  { id: '20m',  alt: '14 MHz',  rc: 'hf', ct: true, range: [14000, 14350] },
  { id: '17m',  alt: '18.1 MHz', rc: 'hf', ct: false, range: [18068, 18168] },
  { id: '15m',  alt: '21 MHz', rc: 'hf', ct: true, range: [21000, 21450] },
  { id: '12m',  alt: '24.9 MHz', rc: 'hf', ct: false, range: [24890, 24990] },
  { id: '10m',  alt: '28 MHz', rc: 'hf', ct: true, range: [28000, 29700] },
  { id: '8m',  alt: '40 MHz', rc: 'vhf', ct: false, range: [40660, 40700] },
  { id: '6m',  alt: '50 MHz', rc: 'vhf', ct: true, range: [50000, 54000] },
  { id: '4m',  alt: '70 MHz', rc: 'vhf', ct: false, range: [70000, 71000] },
  { id: '2m',  alt: '144 MHz', rc: 'vhf', ct: true, range: [144000, 148000] },
  { id: '1.25m',  alt: '222 MHz', rc: 'vhf', ct: false, range: [222000, 225000] },
  { id: '70cm',  alt: '432 MHz', rc: 'uhf', ct: true, range: [420000, 450000] },
  { id: '33cm',  alt: '902 MHz', rc: 'uhf', ct: false, range: [902000, 928000] },
  { id: '23cm',  alt: '1.3 GHz', rc: 'uhf', ct: true, range: [1240000, 1300000] },
  { id: '13cm',  alt: '2.4 GHz', rc: 'uhf', ct: true, range: [2300000, 2450000] },
  { id: '9cm', alt: '3.4 GHz', rc: 'shf', ct: true, range: [3300000, 3500000] },
  { id: '5cm', alt: '5.6 GHz' , rc: 'shf', ct: true, range: [5650000, 5850000] },
  { id: '3cm', alt: '10 GHz' , rc: 'shf', ct: true, range: [10000000, 10500000] },
  { id: '1.2cm', alt: '24 GHz', rc: 'shf', ct: true, range: [24000000, 24250000] },
]

/* load of bands configuration from persistent storage */
const storedCurrentBand = localStorage.getItem(CURRENT_BAND) || ''
const storedSelectedBands = localStorage.getItem(SELECTED_BANDS) || ''

/* initialize writables */
export const currentBand = writable<string>( storedCurrentBand )
export const selectedBandsString = writable<string>( storedSelectedBands )

/* subscribe to automatic persistent save */
currentBand.subscribe( x => localStorage.setItem(CURRENT_BAND, x))
selectedBandsString.subscribe( x => localStorage.setItem(SELECTED_BANDS, x))