<script lang="ts">
import { qsoLog } from "./store/contact";

import { contestId, contestName, exch1Label, exch2Label, hasExch1, hasExch2, hasGrid, hasSerial, startUtc } from "./store/contest";

</script>

<div id="log">
  <div id="logheader" class="panel">
    <div>Contest: {$contestId == null ? 'No contest' : $contestName}</div>
    <div class:hidden={$contestId == null}>Started: {$startUtc?.toISOString().slice(0,16).replace('T', ' ')}</div>
  </div>
  {#if $qsoLog.length > 0}
    <table id="qsolist">
      <tr>
        <th class="tiny qsoh w6 right">UTC</th>
        <th class="tiny qsoh w6 center">Band</th>
        <th class="tiny qsoh w6 center">Mode</th>
        <th class="tiny qsoh w12 left">Call</th>
        <th class="tiny qsoh w6 right" class:hidden={!($hasSerial)}>Sent#</th>
        <th class="tiny qsoh w6 right" class:hidden={!($hasSerial)}>Rcvd#</th>
        <th class="tiny qsoh w8 center" class:hidden={!$hasGrid}>WWLOC</th>
        <th class="tiny qsoh w12 left" class:hidden={!$hasExch1}>{$exch1Label}</th>
        <th class="tiny qsoh w12 left" class:hidden={!$hasExch2}>{$exch2Label}</th>
      </tr>
    {#each $qsoLog as qso }
      <tr>
        <td class="right packed">{qso.utcDateTime.toISOString().slice(2,16).replace('T',' ')}</td>
        <td class="center">{qso.band}</td>
        <td class="center">{qso.mode}</td>
        <td class="left">{qso.call}</td>
        <td class="right" class:hidden={!($hasSerial)}>{qso.serialS}</td>
        <td class="right" class:hidden={!($hasSerial)}>{qso.serialR}</td>
        <td class="center" class:hidden={!$hasGrid}>{qso.gridR}</td>
        <td class="left" class:hidden={!$hasExch1}>{qso.ex1R}</td>
        <td class="left" class:hidden={!$hasExch2}>{qso.ex2R}</td>
      </tr>
    {/each}
  </table>
  {/if}
</div>

<style lang="scss" >
  $bgcolor : #CFC;
  #log { 
     grid-area: "log" ;
     grid-column: span 2 ;
     background: $bgcolor ; 
  }
  #logheader {
    background: darken( $bgcolor, 10% );
    font-size: smaller ;
    display: flex ;
    flex-flow: row ;
    justify-content: space-between;
    div.hidden {
      visibility: hidden
    }
  }
  #qsolist{
    .hidden { display: none }
    font-family: "Roboto Mono", "Courier New", Courier, monospace;
    font-size: smaller ;
    width: max-content ;
  }
  tr:nth-child(2n) { background: lighten($bgcolor, 8%);}

  .w6 { min-width: 5ch }
  .w8 { min-width: 6ch }
  .w12 { min-width: 9ch }
  .right { text-align: right }
  .center { text-align: center ;}
  .left {text-align: left ;}
  .packed { width: max-content }
</style>