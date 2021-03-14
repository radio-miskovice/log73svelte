<!-- Entry panel for contest logging, the actual input -->
<script lang="ts">
import ErrorBar from "./ErrorBar.svelte";
import { currentBand } from "./store/bands";
import { qsoLog } from "./store/contact";
import type { IQso } from "./store/contact";

import {
  hasExch1, hasExch2, hasGrid, hasRst, hasSerial,
  exch1Label, exch1Width, exch2Label, exch2Width,
  exch1Sent, exch2Sent, serialNumber, contestId,
} from "./store/contest";
import { errorMsg } from "./store/error";
import { currentMode } from "./store/modes";
import { mycall, mywwloc } from "./store/station";
import { db } from "./store/database";

  const OPER_SP = 'S&P' ;
  const OPER_CQ = 'CQ' ;

  let call:string|undefined, rstR, serialR, gridR:string|undefined, exch1R, exch2R, rstS ;
  
  let wwlocSentInput, exch1SentInput, exch2SentInput ;
  let defaultRst: string;
  let lastQso : IQso | null = null ;

  let canEditSent = ( $hasGrid || $hasExch1 || $hasExch2 )
  
  let editing =  false ;
  let serialNumberStr = '' ;
  let operationMode = OPER_SP ;
  let smartSend = false ;
  let qsoDateTime : Date | undefined ;

  $: { 
    defaultRst = defaultReportForMode($currentMode); 
    canEditSent = ( $hasGrid || $hasExch1 || $hasExch2 );
    serialNumberStr = $contestId !== '0' ? ( $serialNumber > 99 ? $serialNumber.toString() : (1000+$serialNumber).toString().slice(1) ) : ''
    if( wwlocSentInput && exch1SentInput && exch2SentInput ) {
      wwlocSentInput.disabled = !editing ;
      exch1SentInput.disabled = !editing ;
      exch2SentInput.disabled = !editing ;      
    }
  }

  function setQso() {
    let errors = [] ;
    let qso : IQso = {
      id: 'Q'+ (new Date()).valueOf().toString(36),
      contestId: $contestId, 
      utcDateTime : new Date(),
      band : $currentBand,
      mode : $currentMode,
      call: '',
      mycall: $mycall,
      rstR : rstR || defaultRst,
      rstS : rstS || defaultRst, 
      deleted: false 
    }
    if( !call || call == '' ) errors.push( 'empty callsign') ;
    else qso.call = call.toUpperCase() ;
    console.log('Checking QSO before save:');
    console.log( qso );
    if( $hasSerial ) {
      if ( !serialR ) errors.push( 'no QSO number') ;
      else qso.serialR = serialR ;
      qso.serialS = serialNumberStr ;
    }
    if( $hasGrid ) {
      if( !gridR ) { errors.push( 'no WW locator') ; }
      else {
        if( !(gridR.match(/^[A-R]{2}\d{2}[A-X]{2}$/i)) ) errors.push( 'Invalid WW LOC');
        qso.gridR = gridR.toUpperCase()
        qso.gridS = $mywwloc ;
      }
    }
    if( $hasExch1 ) {
      qso.ex1R = exch1R ;
      qso.ex1S = $exch1Sent ;
      if( !$hasExch2 && !exch1R ) errors.push( `Missing ${$exch1Label}` )
    }
    if( $hasExch2 ) {
      qso.ex2R = exch2R ;
      qso.ex2S = $exch2Sent ;
    }
    if( errors.length == 0 ) {
      $errorMsg = undefined ;
      qso.dateSaved = new Date() ;
      // TODO: save QSO 
      lastQso = { ...qso } ;
      qsoLog.set([ ...$qsoLog, qso ]);
      $serialNumber++ ;
      db.log.add( qso, qso.id ).then( (r) => {
        console.log( 'QSO saved to database');
      })
      .catch( e => {
        console.log( e );
        $errorMsg = 'DB Error saving QSO';
      })
      resetQso() ;
    }
    else {
      $errorMsg = "Can't log QSO: " + errors.join(', ')
    }
  }

  function resetQso() {
    qsoDateTime = null ;
    call = null ;
    rstR = null ;
    rstS = null ;
    serialR = null;
    gridR = null ;
    exch1R = null;
    exch2R = null;
  }

  function defaultReportForMode(mode: string): string {
    if (mode.match(/^(AM|FM|SSB|LSB|USB)$/)) return "59";
    else return "599";
  }

  // switch between CQ and Search & Pounce 
  function toggleOperationMode( e: Event ) {
    operationMode = (operationMode == OPER_SP) ? OPER_CQ : OPER_SP
  }

  // deactivates edit when Enter is pressed while editing exchange Sent
  function closeEditSent( e: KeyboardEvent ) {
    if( e.key == 'Enter' ) {
      e.preventDefault()
      e.stopPropagation()
      editing = false 
    }
  }

  // Toggle edit mode when double clicked 
  function toggleEditSent( e : Event ) {
    editing = !editing ;
  }

</script>

<div id="entry" class="panel">
  <div class="form">
      <!-- svelte-ignore a11y-label-has-associated-control -->
      <label class="small row1">CALL <span id="smart" 
        class:visible={smartSend} class:suspended={defaultRst == '59'}>SMART</span></label>
      <!-- svelte-ignore a11y-label-has-associated-control -->
      <label class="small row1" class:nodisplay={!$hasRst}>RST</label>
      <!-- svelte-ignore a11y-label-has-associated-control -->
      <label class="small row1" class:nodisplay={!$hasSerial}>SERIAL</label>
      <!-- svelte-ignore a11y-label-has-associated-control -->
      <label class="small row1" class:nodisplay={!$hasGrid}>WWLOC</label>
      <!-- svelte-ignore a11y-label-has-associated-control -->
      <label class="small row1" class:nodisplay={!$hasExch1}>{$exch1Label || "EXCH1"}</label>
      <!-- svelte-ignore a11y-label-has-associated-control -->
      <label class="small row1" class:nodisplay={!$hasExch2}>{$exch2Label || "EXCH2"}</label>

      <input id="call" bind:value={call} type="text" class="call row2" maxlength="14" autocomplete="off"  />
      <input type="text" bind:value={rstR}    class="report row2" maxlength="3" placeholder={defaultRst} class:nodisplay={!$hasRst} autocomplete="off"  />
      <input type="text" bind:value={serialR} class="serial row2" maxlength="5" class:nodisplay={!$hasSerial} autocomplete="off"  />
      <input type="text" bind:value={gridR}   class="wwloc row2" maxlength="6" class:nodisplay={!$hasGrid} autocomplete="off"  />
      <input type="text" bind:value={exch1R}  class="extra row2" class:nodisplay={!$hasExch1} maxlength={$exch1Width || 5} autocomplete="off"  />
      <input type="text" bind:value={exch2R}  class="extra row2" class:nodisplay={!$hasExch2} maxlength={$exch2Width || 5} autocomplete="off"  />

      <!-- button area -->
      <div id="logQso" class="row3" >
        <button class="action" on:click={toggleOperationMode}>{operationMode}</button>
        <button class="action" on:click={setQso} >Log!</button>
      </div>
      <input type="text" class="report row3" maxlength="3" placeholder={defaultRst} class:nodisplay={!$hasRst} />

      <!-- TODO: create serial number array -->
      <input type="text" disabled class="serial row3 sent" maxlength="5" 
        class:nodisplay={!$hasSerial} bind:value={serialNumberStr} />

      <input type="text" class="wwloc row3 sent" maxlength="6" bind:this={wwlocSentInput} 
        bind:value={$mywwloc} class:nodisplay={!$hasGrid}  on:keypress={closeEditSent} />
      <input type="text" class="extra row3 sent" class:nodisplay={!$hasExch1} 
         bind:this={exch1SentInput}
         maxlength={$exch1Width || 5}
         bind:value={$exch1Sent} on:keypress={closeEditSent} autocomplete="off"  />
      <input type="text" class="extra row3 sent" class:nodisplay={!$hasExch2} 
         bind:this={exch2SentInput}
         maxlength={$exch2Width || 5}
         bind:value={$exch2Sent} on:keypress={closeEditSent} autocomplete="off" />
  </div>
    <ErrorBar />
  <!-- panel tlacitek a provoznich akci -->
  <div class="vertical">
    <p class="small config" on:click={(e) => { editing = !editing && canEditSent }}>
      {#if (canEditSent) }
      <svg class="icon black"><use xlink:href="#icon-edit" /></svg>
      {:else}
      <svg class="icon black" ><use xlink:href="#icon-no-edit" /></svg>
      CAN'T
      {/if}EDIT SENT TEXT
    </p>
    <button id="smartButton" class="action" on:click={ e => smartSend = !smartSend }>SMART {smartSend ? 'ON' : 'OFF'}</button>
  </div>
</div>

<style type="text/scss" >
  div#entry {
    grid-area: "ent";
    grid-column: span 3 ;
    background: #cff;
    display: grid ;
    grid-template-columns: auto 1fr max-content ;
    column-gap: 1em ;
    // flex-flow: row ;
    // justify-content: space-between ;
  }

  div.form {
    display: grid;
    grid-auto-columns: auto;
    grid-template-columns: auto;
    grid-template-rows: 0.8em auto auto;
    grid-auto-rows: min-content;
    gap: 8px;
    justify-content: start;
    width: min-content;
  }

  input[type="text"] {
    padding: 2px 4px;
    border: none;
    font-family: "Roboto Mono", "Courier New", Courier, monospace;
    font-size: larger;
    color: navy ;

    &:disabled {
      background: rgb(183, 223, 229);
      -webkit-user-select: none;
      -moz-user-select: none;
    }
  }
  .nodisplay {
    display: none !important;
  }

  #call {
    text-transform: uppercase;
    max-width: 15ch;
    margin: 0;
  }

  .row1 { grid-row: 1 / 2; }
  .row2 { grid-row: 2 / 3; }
  .row3 { grid-row: 3 / 4; }

  #logQso {
    grid-column: 1 / 2;
    display: flex ;
    flex-flow: row;
    align-content: center ;
    justify-content: space-between ;
    button {
      width: 6ch ;
      max-width: 48%;
      flex: 1 0 ;
    }
  }

  .serial {
    width: 5ch;
  }

  .report {
    width: 4ch;
  }

  .wwloc {
    width: 7ch;
    text-transform: uppercase;
  }
  
  .extra {
    width: 11ch;
  }

  .vertical {
    // grid-row: 1 / 4;
    // width: 100%  ;
    display: flex ;
    flex-flow: column wrap ;
    align-content: flex-start ;
    justify-content: flex-start;
    padding: 2px 8px;
    border: 1px solid gray ;
  }

  label.config { width: max-content }
  label.small input[type=checkbox] { position: relative; top: 2px }

  #smart { 
    background: yellow ; 
    color: #555; 
    padding: 1px 0.25em ; 
    margin-left: 3em ;
    border: thin solid #555; 
    border-radius: 6px ;
    visibility: hidden 
  }
  #smart.visible { visibility: visible }
  #smart.suspended {
    color: #aaa ;
    background:rgb(227, 241, 145);
  }
  #smartButton { width: 100% ; padding: 0.25em; margin: 0.25em 0  }
</style>
