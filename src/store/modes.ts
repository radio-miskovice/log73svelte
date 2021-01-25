import { writable } from "svelte/store"

const CURRENT_MODE = 'currentMode'
const SELECTED_MODES = 'selectedModes'

export interface SelectableMode {
  id: string;
  selected: boolean
}

const ALL_MODES_BASE = [
  'CW', 'SSB', 'AM', 'FM', 'RTTY', 'PSK', 'MFSK', 'SSTV'
]

let allModesString = localStorage.getItem('ALL_MODES')
let allModes = []

if (!allModesString) {
  localStorage.setItem('ALL_MODES', ALL_MODES_BASE.join('|'))
  allModes = ALL_MODES_BASE
}
else {
  allModes = allModesString.split('|')
}

export const ALL_MODES = allModes

/* load of modes configuration from persistent storage */
const storedCurrentMode = localStorage.getItem(CURRENT_MODE) || ''
const storedSelectedModes = localStorage.getItem(SELECTED_MODES) || ''

/* initialize writables */
export const currentMode = writable<string>( storedCurrentMode )
export const selectedModesString = writable<string>( storedSelectedModes )

/* subscribe to automatic persistent save */
currentMode.subscribe( x => localStorage.setItem(CURRENT_MODE, x))
selectedModesString.subscribe( x => localStorage.setItem(SELECTED_MODES, x))
