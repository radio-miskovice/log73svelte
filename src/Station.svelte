<script lang="ts">
import { onMount } from 'svelte';

  import { mycall, mywwloc, myname, myqth, email } from './store/station'
  export let visible: boolean 
  let validGrid: boolean 

  onMount( () => validateGrid() )

  function closeDialog( event : KeyboardEvent ) {
    if( event.code == 'Enter' ) {
      event.preventDefault()
      visible = false 
    }
  }

  function validateGrid() {
    validGrid = !!$mywwloc.match(/^[A-R]{2}[0-9]{2}([A-X]{2})?$/i)
  }

</script>
<style>
  div { 
    background: #FFC ; 
    padding: 0 1em 1em 1em ;
    grid-column: 1 / 2; 
    display: grid ;
    grid-template-columns: auto 1fr ; 
    box-shadow: 4px 2px 6px gray ;
    border: 1px solid black ;
    width: 30ch ;
    margin-left: -15ch ;
    position: fixed ;
    top: 2em ;
    left: 50% ;
    visibility: hidden;
    opacity: 0;
    transition: all 0.2s ease-in-out 0.2s ;
  }
  div.visible { 
    visibility: visible ;
    opacity: 1;
    transition: all 0.2s ease-in-out 0.2s ;
  }
  label { padding: 0.2em 0.4em 0.2em 0 }
  label.hint {
    grid-column: 1 / 3 ;
    color: navy ;
    font-size : smaller ;
    font-style: italic ;
    text-align: center ;
    padding-top: 1em ;
  }
  input {
    padding: 0.2em 0.4em ;
    box-shadow: 2px 2px 4px gray ;
    border: none; 
    max-width: 17ch
  }
  input.wwloc { max-width: 8ch; }
  input.invalid { color: red; text-decoration-style: wavy; }

  h3 { grid-column: 1 / 3 ; margin: 2px 0 8px 0 ; padding: 4px ; text-align: center;
  color: #FFC; background: black ; }
  img.icon { height: 1ch ; background: red; padding: 3px ; border-radius: 2px  }
</style>
<div class:visible={visible}>
  <h3>MY STATION</h3>
  <!-- svelte-ignore a11y-label-has-associated-control -->
  <label>My callsign:</label>
  <input class="upcase" type=text 
    bind:value={$mycall} maxlength=16
    on:keypress={closeDialog} />
  <!-- svelte-ignore a11y-label-has-associated-control -->
  <label>Grid:</label>
  <input class="upcase wwloc" type=text bind:value={$mywwloc} maxlength=8 
      on:keypress={closeDialog} 
      on:change={validateGrid}
      class:invalid={!validGrid}
      />

  <!-- svelte-ignore a11y-label-has-associated-control -->
  <label>Operator name:</label>
  <input type=text bind:value={$myname} maxlength=12
      on:keypress={closeDialog} />

  <!-- svelte-ignore a11y-label-has-associated-control -->
  <label>QTH:</label>
  <input type=text bind:value={$myqth} maxlength=20
      on:keypress={closeDialog} />

  <!-- svelte-ignore a11y-label-has-associated-control -->
  <label>E-mail:</label>
  <input type=text bind:value={$email} maxlength=32
      on:keypress={closeDialog} />

      <!-- svelte-ignore a11y-label-has-associated-control -->
      <!-- svelte-ignore a11y-missing-attribute -->
      <label class="hint">Click edit icon <img class="icon" src="./pencil-edit.svg" /> or press Enter in any input field to close the dialog. 
    Data are saved automatically as you edit.</label>
</div>