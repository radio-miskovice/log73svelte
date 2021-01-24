<script lang="ts">
  import { mycall, mywwloc, myname, myqth } from './store/station'
  export let visible: boolean 

  function closeDialog( event : KeyboardEvent ) {
    if( event.code == 'Enter' ) {
      event.preventDefault()
      visible = false 
    }
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
  label { padding-right: 1ch }
  label.hint {
    grid-column: 1 / 3 ;
    color: navy ;
    font-size : smaller ;
    font-style: italic ;
    text-align: center ;
    padding-top: 1em ;
  }
  input {
    padding: 0 3px ; 
    border: none; 
    max-width: 17ch
  }
  input.wwloc { max-width: 10ch; }
  h2, h3, h4 { grid-column: 1 / 3 ; margin: 2px 0 8px 0 ; padding: 4px ; text-align: center;
  color: #FFC; background: black ; }
  img.icon { height: 1ch ; background: red; padding: 3px ; border-radius: 2px  }
</style>
<div class:visible={visible}>
  <h3>MY STATION</h3>
  <label>My callsign:</label>
  <input class="upcase" type=text 
    bind:value={$mycall} maxlength=16
    on:keypress={closeDialog} />
  <label>WW Locator:</label>
  <input class="upcase wwloc" type=text bind:value={$mywwloc} maxlength=8 
      on:keypress={closeDialog} />

  <label>Operator name:</label>
  <input type=text bind:value={$myname} maxlength=12
      on:keypress={closeDialog} />

  <label>QTH:</label>
  <input type=text bind:value={$myqth} maxlength=20
      on:keypress={closeDialog} />
  <label class="hint">Click edit icon <img class="icon" src="./pencil-edit.svg" /> or press Enter in any input field to close the dialog. 
    Data are saved automatically as you edit.</label>
</div>