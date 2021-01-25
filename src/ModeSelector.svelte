<script lang="ts">

  import { currentMode, selectedModesString  } from './store/modes'
  import type { SelectableMode } from './store/modes'
  export let showDialog: boolean
  export let modes : SelectableMode[]

  function checkOneMode ( event ) {
    const t = event.currentTarget
    if( $currentMode == t.id && !t.checked ) {
      for( const m of modes ) {
        if( m.selected ) {
          $currentMode = m.id ;
          break ;
        }
      }
      $currentMode = ''
    }
  }

  function closeDialogAndSave( e ) {
    const selectedModes = modes.filter( m => m.selected ).map( m => m.id ).join('|')
    $selectedModesString = selectedModes
    showDialog = false
  }
</script>
<style>
  div {
    position: absolute ; 
    top: 0; 
    left : 0; 
    visibility: hidden; 
    z-index: -1 ;

    padding: 0 1em 1em 1em ;
    background: #ffc ;
    box-shadow: 4px 2px 6px gray ;
    border: 1px solid black ;

    width: max-content
  }
  div.showDialog {
    visibility: visible ;
    z-index: 3 ;
    transition: all 0.2s ease-in
  }
  h3 { 
    margin: 2px 0 8px 0 ; 
    padding: 4px ; 
    text-align: center;
    color: #FFC; 
    background: black ; 
  }  
  ul.modes { 
    list-style-type: none ;
    display: grid ;
    grid-template-columns: repeat(4, 1fr) ;
    gap: 4px ;
    margin: 0; padding: 0 ;
  }
  ul.modes label { padding: 3px  }
  label.tiny { font-size: x-small; color: gray; text-align: right; text-transform: uppercase; width: 100% }
  input[type=checkbox] { padding-top: 2px }
 
</style>

<div class:showDialog>
  <h3>Select modes to use:</h3>
  <ul class="modes">
    {#each modes as mode }
    <li><label><input 
        type="checkbox" 
        id="{mode.id}" 
        bind:checked={mode.selected}
        on:change={checkOneMode}> {mode.id}</label></li>
  {/each}
  </ul>
  <!-- svelte-ignore a11y-label-has-associated-control -->
  <label class="tiny" on:click={closeDialogAndSave}>SAVE &amp; CLOSE &gt;&gt</label>
</div>
