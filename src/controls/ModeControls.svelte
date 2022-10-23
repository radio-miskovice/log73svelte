
<script lang="ts">
import { ALL_MODES, currentMode, selectedModesString } from '../store/modes';
import type { SelectableMode } from '../store/modes';
import ModeSelector from './ModeSelector.svelte'

let showDialog = false // control band selection dialog
let modes: SelectableMode[] = ALL_MODES.map( id => ({ id, selected: false }) ) 

for( let i = 0; i < modes.length ; i++ ) {
  let initialSelection = $selectedModesString.split('|') // persistent selection
  const modeID = modes[i].id 
  const selected = initialSelection.find( x => (x == modeID) )
  if( modeID == selected || modeID == $currentMode ) {
    modes[i].selected = true
  } 
}

function selectMode( event : any ) {
  const c = event.currentTarget
  $currentMode = c.id
}

function openDialog() {
  showDialog = true
}
</script>

<style>
  div.component { 
    grid-row:   2 / 3 ;
  }
  /* ul { list-style-type: none ;
    font-size: smaller ;
    display: flex ;
    flex-flow: row wrap ;
    margin: 0; padding: 0 ;
    max-width: 25ch 
  }
  li { display: block; margin: 0; padding: 2px   } */
  label.mode {  text-align: center ; color: silver; background: rgb(138, 16, 142) ; border-radius: 3px; width: 6ch; padding: 3px }
  label.mode.selected { color: white; font-weight: bold }
  label.warning { background: yellow ; border-radius: 3px; padding: 1px; border: 1px solid black }
</style>


<!-- svelte-ignore a11y-label-has-associated-control -->
<div class="component">
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <p class="tiny" on:click={openDialog}>CONFIGURE MODES <svg class="icon"><use xlink:href="#icon-config" /></svg> </p>
  <ul class="buttonPanel">
    {#if $currentMode == ""}
    <label class="warning">Configure at least one mode</label>
    {/if}
    {#each modes as mode }
      {#if mode.selected }
      <li>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <label class="mode" id={mode.id}
        class:selected={mode.id === $currentMode}
        on:click={selectMode}>{mode.id}</label></li>
      {/if}
    {/each}
  </ul>
  <ModeSelector bind:showDialog bind:modes />
</div>

