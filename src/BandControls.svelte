<script context="module" lang="ts">
export interface SelectableBand {
  band: IBand,
  selected: boolean 
}
</script>
<script lang="ts">
import { ALL_BANDS, HF_BAND } from './store/controls';
import type { IBand } from './store/controls';
import BandSelector from './BandSelector.svelte'

let bands = ALL_BANDS.map( band => ({ band, selected: false }) )
let currentBand = bands[0].band.id 
let showDialog : boolean = false 

function selectBand( event : any ) {
  const c = event.currentTarget
  const t = event.target
  console.log( 'before:', currentBand )
  currentBand = c.id
  console.log( 'after:', currentBand )
  console.log( c, t )
}
function openDialog() {
  showDialog = true
}
</script>
<style>
  div.component { position: relative }
  ul { list-style-type: none ;
    font-size: smaller ;
    display: flex ;
    flex-flow: row wrap ;
    margin: 0; padding: 0 ;
    max-width: 25ch 
  }
  li { display: block; margin: 0; padding: 2px   }
  label.band {  text-align: center ; color: silver; background: rgb(138, 16, 142) ; border-radius: 3px; width: 6ch; padding: 3px }
  label.band.selected { color: white; font-weight: bold }
  label.tiny { font-size: x-small;}
</style>
<!-- svelte-ignore a11y-label-has-associated-control -->
<div class="component">
  <label class="tiny" on:click={openDialog}>SELECT BANDS &gt;&gt;
  </label>
  <ul>
    {#each bands as selectable }
      {#if selectable.selected }
      <li><label class="band" id={selectable.band.id}
        class:selected={selectable.band.id === currentBand}
        on:click={selectBand}>{selectable.band.id}</label></li>
      {/if}
    {/each}
  </ul>
  <BandSelector bind:showDialog bind:bands bind:currentBand />
</div>

