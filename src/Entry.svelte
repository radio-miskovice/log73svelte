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
    import { writable } from "svelte/store";
 //   import BandControls from "./controls/BandControls.svelte";

  const OPER_SP = 'S&P' ;
  const OPER_CQ = 'CQ' ;

  let callsign = writable<string>(''), 
    rstR = writable<string>(''), 
    rstS = writable<string>(''), 
    serialR = writable<string>(''), 
    gridR = writable<string>(''), 
    exch1R = writable<string>(''), 
    exch2R = writable<string>(''),
    remark : string = '' ;

  let callsignElement, rstRElement, serialRElement, gridRElement, exch1RElement, exch2RElement ;

  
  let wwlocSentInput, exch1SentInput, exch2SentInput ;
  let defaultRst: string;
  let lastQso : IQso | null = null ;

  let canEditSent = ( $hasGrid || $hasExch1 || $hasExch2 )
  let canSaveQso = false ;
  let qsoSaveButton ;
  let editing =  false ;
  let serialNumberStr = '' ;
  let operationMode = OPER_SP ;
  let smartSend = false ;
  let qsoDateTime : Date | undefined ;

  $: { 
    defaultRst = defaultReportForMode($currentMode); 
    canEditSent = ( $hasGrid || $hasExch1 || $hasExch2 );
    serialNumberStr = $contestId !== null ? ( $serialNumber > 99 ? $serialNumber.toString() : (1000+$serialNumber).toString().slice(1) ) : ''
    if( wwlocSentInput && exch1SentInput && exch2SentInput ) {
      wwlocSentInput.disabled = !editing ;
      exch1SentInput.disabled = !editing ;
      exch2SentInput.disabled = !editing ;      
    }
  }

  function saveQso() {
    let errors = [] ;
    let qso : IQso = {
      id: 'Q'+ (new Date()).valueOf().toString(36),
      contestId: $contestId || 'C', 
      utcDateTime : new Date(),
      band : $currentBand,
      mode : $currentMode,
      call: $callsign,
      mycall: $mycall,
      rstR : $rstR || defaultRst,
      rstS : $rstS || defaultRst, 
      note: remark ,
      deleted: false 
    }
    console.log('Checking QSO before save:');
    console.log( qso );
    if( $currentBand == '' ) errors.push('Band not selected');
    if( $currentMode == '' ) errors.push('Mode not selected');
    if( !callsign ) errors.push( 'empty callsign') ;
      else qso.call = qso.call.toUpperCase() ;
    if( $hasSerial ) {
      if ( !serialR ) errors.push( 'no QSO number') ;
      else qso.serialR = $serialR ;
      qso.serialS = serialNumberStr ;
    }
    if( $hasGrid ) {
      if( !gridR ) { errors.push( 'no WW locator') ; }
      else {
        if( !($gridR.match(/^[A-R]{2}\d{2}[A-X]{2}$/i)) ) errors.push( 'Invalid WW LOC');
        qso.gridR = $gridR.toUpperCase()
        qso.gridS = $mywwloc ;
      }
    }
    if( $hasExch1 ) {
      qso.ex1R = $exch1R ;
      qso.ex1S = $exch1Sent ;
      if( !$hasExch2 && !exch1R ) errors.push( `Missing ${$exch1Label}` )
    }
    if( $hasExch2 ) {
      qso.ex2R = $exch2R ;
      qso.ex2S = $exch2Sent ;
    }
    if( errors.length == 0 ) {
      $errorMsg = undefined ;
      qso.dateSaved = new Date() ;
      // TODO: save QSO 
      lastQso = { ...qso } ;
      qsoLog.set([ qso, ...$qsoLog ]);
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
    $callsign = '' ;
    $rstR = '' ;
    $rstS = defaultRst ;
    $serialR = '';
    $gridR = '' ;
    $exch1R = '';
    $exch2R = '';
    remark = null;
  }

  function defaultReportForMode(mode: string): string {
    if (mode.match(/^(AM|FM|SSB|LSB|USB)$/)) return "59";
    else return "599";
  }

  // switch between CQ and Search & Pounce 
  function toggleOperationMode( e: Event ) {
    operationMode = (operationMode == OPER_SP) ? OPER_CQ : OPER_SP
  }

    let cannotSave = !( $currentBand && $currentMode
      && $callsign
      && (!$hasExch1 || $exch1R)
      && (!$hasExch2 || $exch2R)
      && (!$hasGrid  || $gridR)
      && (!$hasSerial || $serialR)
    );

  function updateSaveButton( e: Event ) {
    cannotSave = !( $currentBand && $currentMode
      && $callsign
      && (!$hasExch1 || $exch1R)
      && (!$hasExch2 || $exch2R)
      && (!$hasGrid  || $gridR)
      && (!$hasSerial || $serialR)
    );
    qsoSaveButton.disabled = cannotSave ;
  }

  // deactivates edit when Enter is pressed while editing exchange Sent
  function closeEditSent( e: KeyboardEvent ) {
    if( e.key == 'Enter' ) {
      e.preventDefault()
      e.stopPropagation()
      editing = false 
    }
  }

  // move focus forward on enter
  function onEnterKey( e: KeyboardEvent ) {
    let sequence = ['call', 'rstR', 'serialR', 'exch1R', 'exch2R'];
    let mask = [ true, $hasRst, $hasSerial, $hasExch1, $hasExch2 ];
    console.log(e);
    if( e.key == 'Enter' || e.key == ' ' ) {
      e.preventDefault()
      e.stopPropagation()
      let t = e.currentTarget ;
      let nextId = '' ;
      let n = sequence.findIndex((x) => x == t.id );
      n = (n+1) % sequence.length ;
      nextId = sequence[n];
      if( nextId !== '') {
        console.log(`Skip to ${nextId}`)
        switch( nextId ) {

          case 'rstR': 
            if( $hasRst ) {
              rstRElement.focus();
              break;
            }
          case 'serialR':
            if( $hasSerial ) {
              serialRElement.focus();
              break;
            }
          case 'gridR':
            if( $hasGrid ) {
              gridRElement.focus();
              break;
            }
          case 'exch1R':
            if( $hasExch1 ) {
              exch1RElement.focus();
              break ;
            }
          case 'exch2R':
            if( $hasExch2 ) {
              exch2RElement.focus();
              break;
            }
          case 'call': 
            // TODO: in SMART mode check if QSO is to be saved
            if(e.key == 'Enter' && smartSend ) {
              updateSaveButton(null);
              if( !cannotSave ) saveQso();
            }
            callsignElement.focus(); break; 
        }
      }
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
      <label class="small row1 serial" class:nodisplay={(!$hasSerial) || ($contestId == null)}>SERIAL</label>
      <!-- svelte-ignore a11y-label-has-associated-control -->
      <label class="small row1" class:nodisplay={!$hasGrid}>WWLOC</label>
      <!-- svelte-ignore a11y-label-has-associated-control -->
      <label class="small row1" class:nodisplay={!$hasExch1}>{$exch1Label || "EXCH1"}</label>
      <!-- svelte-ignore a11y-label-has-associated-control -->
      <label class="small row1" class:nodisplay={!$hasExch2}>{$exch2Label || "EXCH2"}</label>
      <!-- svelte-ignore a11y-label-has-associated-control -->
      <label class="small row1">REMARK</label>

      <input id="call" type="text" class="call row2" maxlength="14" autocomplete="off" 
        bind:value={$callsign} 
        bind:this={callsignElement}
        on:change={updateSaveButton}  
        on:keypress={onEnterKey} />
      <input id="rstR" type="text" class="report row2" maxlength="3" placeholder={defaultRst} autocomplete="off"  
        bind:value={$rstR} 
        bind:this={rstRElement}
        on:keypress={onEnterKey} 
        class:nodisplay={!$hasRst && ($contestId == null)} />
      <input id="serialR" type="text" class="serial row2" maxlength="5" class:nodisplay={(!$hasSerial) || ($contestId == null)} 
        bind:value={$serialR} 
        bind:this={serialRElement}
        on:keypress={onEnterKey} 
        on:change={updateSaveButton} autocomplete="off"  />
      <input id="gridR" type="text" class="wwloc row2" maxlength="6" class:nodisplay={!$hasGrid} 
        bind:value={$gridR}
        bind:this={gridRElement}
        on:keypress={onEnterKey} 
        on:change={updateSaveButton} autocomplete="off"  />
      <input id="exch1R" type="text" class="extra row2" class:nodisplay={!$hasExch1} maxlength={$exch1Width || 5} 
        bind:value={$exch1R}  
        bind:this={exch1RElement}
        on:keypress={onEnterKey} 
        on:change={updateSaveButton} autocomplete="off"  />
      <input id="exch2R" type="text" class="extra row2" class:nodisplay={!$hasExch2} maxlength={$exch2Width || 5} 
        bind:value={$exch2R}  
        bind:this={exch2RElement}
        on:keypress={onEnterKey}
        on:change={updateSaveButton} autocomplete="off"  />
      <input type="text" bind:value={remark}  class="remark row2"  maxlength="20" autocomplete="off"  />
      {#if $currentBand == "" || $currentMode == ""}
      <!-- svelte-ignore a11y-label-has-associated-control -->
      <label class="warning">
        {#if $currentBand == ""}No Band, {/if}
        {#if $currentMode == ""}No Mode, {/if}
        No Logging!
      </label>
      {/if}

      <!-- button area -->
      <div id="logQso" class="row3" >
        <button class="action" on:click={toggleOperationMode}>{operationMode}</button>
        <button class="action" on:click={saveQso} bind:this={qsoSaveButton} disabled={true} >Log!</button>
      </div>
      <input type="text" class="report row3" maxlength="3" placeholder={defaultRst} class:nodisplay={!$hasRst} />

      <!-- TODO: create serial number array -->
      <input type="text" disabled class="serial row3 sent" maxlength="5" 
        class:nodisplay={(!$hasSerial) || ($contestId == null)} bind:value={serialNumberStr} />

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
    <!-- svelte-ignore a11y-click-events-have-key-events -->
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
  label.warning { background: yellow ;  padding: 2px; 
    border-radius: 3px; border: 1px solid black;
    text-align: center; font-size: small ; margin: auto  
  }

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
      user-select: none ;
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
  /*
  label.config { width: max-content }
  label.small input[type=checkbox] { position: relative; top: 2px }
  */
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
