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
  <div id="qsolist">
    <p class="tiny">UTC</p>
    <p class="tiny">Band</p>
    <p class="tiny">Mode</p>
    <p class="tiny">Call</p>
    <p class="tiny" class:hidden={!$hasSerial}>Sent#</p>
    <p class="tiny" class:hidden={!$hasSerial}>Rcvd#</p>
    <p class="tiny" class:hidden={!$hasGrid}>WWLOC</p>
    <p class="tiny" class:hidden={!$hasExch1}>{$exch1Label}</p>
    <p class="tiny" class:hidden={!$hasExch2}>{$exch2Label}</p>
  </div>

  
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
</style>