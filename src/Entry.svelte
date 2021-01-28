<script lang="ts">
  import {
    hasExch1, hasExch2, hasGrid, hasRst, hasSerial, exch1Label, exch1Width, exch2Label, exch2Width
  } from "./store/contest";
  import { currentMode } from './store/modes'
  // Entry panel for contest logging 
  let defaultRst: string 
  
  $:  defaultRst = defaultReportForMode( $currentMode ) ;

  function defaultReportForMode( mode : string ) : string  {
    if( mode.match(/^(AM|FM|SSB|LSB|USB)$/)) return '59' ;
    else return '599';
  }

</script>
<style>
  div#entry { 
    background: #CFF ; 
    grid-column: 1 / 2 ;
    display: grid ;
    grid-template-columns: auto ;
    gap : 8px ;
    padding: 8px 12px 12px 8px ;
    width: fit-content ;
  }

  input[type=text] {
    padding: 4px ;
    border: none ;
    font-family: 'Roboto Mono', 'Courier New', Courier, monospace ;
    font-size: larger ;
    box-shadow: 2px 2px 3px silver ;
  }
  .nodisplay { display: none !important }
  #call { 
    text-transform: uppercase ;
    max-width: 15ch ;
  }

  .row1 { grid-row: 1 / 2 ; }
  .row2 { grid-row: 2 / 3 ; }
  .row3 { grid-row: 3 / 4 }
  #logQso { grid-row: 3 / 4 ; grid-column: 1 / 2 }
  
  .serial { width: 5ch; }
  .report { width: 4ch }
  .wwloc  { width: 7ch ; text-transform: uppercase; }
  .extra  { width: 11ch }

  /* input.sent { disabled: true } */

</style>

<div id="entry">
  <!-- svelte-ignore a11y-label-has-associated-control -->
  <label class="small row1">CALL</label>
  <!-- svelte-ignore a11y-label-has-associated-control -->
  <label class="small row1"  class:nodisplay={!$hasRst}>RST</label>
  <!-- svelte-ignore a11y-label-has-associated-control -->
  <label class="small row1" class:nodisplay={!$hasSerial}>SERIAL</label>
  <!-- svelte-ignore a11y-label-has-associated-control -->
  <label class="small row1" class:nodisplay={!$hasGrid}>WWLOC</label>
  <!-- svelte-ignore a11y-label-has-associated-control -->
  <label class="small row1" class:nodisplay={!$hasExch1}>{$exch1Label || 'EXCH1'}</label>
  <!-- svelte-ignore a11y-label-has-associated-control -->
  <label class="small row1" class:nodisplay={!$hasExch2}>{$exch2Label || 'EXCH2'}</label>

  <input id="call" type="text" class="call row2" maxlength=14 autocomplete=off>
  <input type="text" class="report row2" maxlength=3 placeholder={defaultRst} class:nodisplay={!$hasRst} autocomplete=off>
  <input type="text" class="serial row2" maxlength=5 class:nodisplay={!$hasSerial} autocomplete=off>
  <input type="text" class="wwloc row2"  maxlength=6 class:nodisplay={!$hasGrid} autocomplete=off>
  <input type="text" class="extra row2"  class:nodisplay={!$hasExch1} maxlength={$exch1Width || 5} autocomplete=off>
  <input type="text" class="extra row2"  class:nodisplay={!$hasExch2} maxlength={$exch2Width || 5} autocomplete=off>

  <!-- svelte-ignore a11y-label-has-associated-control -->
  <button id="logQso">Log QSO</button>
  <input type="text" class="report row3" maxlength=3 placeholder={defaultRst} class:nodisplay={!$hasRst} >
  <input type="text" class="serial row3 sent" maxlength=5 class:nodisplay={!$hasSerial}>
  <input type="text" class="wwloc row3 sent" maxlength=6 class:nodisplay={!$hasGrid}>
  <input type="text" class="extra row3 sent" class:nodisplay={!$hasExch1} maxlength={$exch1Width || 5} autocomplete=off>
  <input type="text" class="extra row3 sent" class:nodisplay={!$hasExch2} maxlength={$exch2Width || 5} autocomplete=off>
  
</div>