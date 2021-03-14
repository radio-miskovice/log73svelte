<script lang="ts">
  import {
    hasExch1, hasExch2, hasGrid, hasRst, hasSerial, 
    exch1Label, exch1Width, exch2Label, exch2Width, 
    contestName, contestNameExport, exch1Sent, exch2Sent, 
    activateContest, contestId, contestIdLatest, reloadContest, updateContest, } from "../store/contest";
  import { mycall, mywwloc } from "../store/station";

  export let showDialog: boolean;

  /** checkbox definitions to handle disabling */
  let hasRstCb, hasSerialCb, hasGridCb, hasExch1Cb, hasExch2Cb // checkbox elements of contest config
  let newContestBtn, stopContestBtn, restartContestBtn, finishContestBtn         // 

  const GOOGLE_SEARCH = 'https://www.google.com/search?q=rules+'
  let searchUrl: string 

  $: {
    searchUrl = GOOGLE_SEARCH + encodeURI($contestName);
    if( hasRstCb && hasSerialCb && hasGridCb && hasExch1Cb && hasExch2Cb ) {
      if( $contestId == null ) {
        hasRstCb.disabled = false ;
        hasSerialCb.disabled = false ;
        hasGridCb.disabled = false ;
        hasExch1Cb.disabled = false ;
        hasExch2Cb.disabled = false ;
      }
      else {
        hasRstCb.disabled = true ;
        hasSerialCb.disabled = true ;
        hasGridCb.disabled = true ;
        hasExch1Cb.disabled = true ;
        hasExch2Cb.disabled = true ;
      }
    }
    if( newContestBtn )     newContestBtn.disabled = !($contestId == null)
    if( stopContestBtn )    stopContestBtn.disabled = ($contestId == null)
    if( restartContestBtn ) restartContestBtn.disabled = !($contestId == null) || ($contestIdLatest == '')
    if( finishContestBtn )  finishContestBtn.disabled = ( $contestId == null );
  }
   
  function closeDialog(e) {
    showDialog = false;
  }

  function searchContestName( event: KeyboardEvent | MouseEvent ) {
    if( event instanceof MouseEvent
      || ( (event instanceof KeyboardEvent) && event.key == 'Enter' )) {
      event.preventDefault();
      event.stopPropagation();
      window.open('https://www.google.com/search?q=rules+'+encodeURI($contestName), '_blank')
    }
  }

  function stopContest() {
    $contestIdLatest = $contestId ;
    $contestId = null ;
  }

  function finishContest() {
    updateContest( $contestId, { dateClosed: new Date() });
    stopContest();
  }

  function restartContest() {
    console.log('restart contest')
    const id = $contestIdLatest 
    reloadContest( id )
  }

  function newContest() {
    const contest = {
      id: null,
      hasGrid : $hasGrid,
      hasRst: $hasRst,
      hasSerial: $hasSerial,
      mycall: $mycall,
      mywwloc: $mywwloc,
      name: $contestName,
      nameExport: $contestNameExport,
      startDate: new Date(),
      hasExch1: $hasExch1,
      hasExch2: $hasExch2,
      exch1Label: $exch1Label,
      exch1Width: $exch1Width,
      exch2Label: $exch2Label,
      exch2Width: $exch2Width,
      exch1Sent: $exch1Sent,
      exch2Sent: $exch2Sent
    };
    activateContest( contest, $mycall, $mywwloc );
  }
</script>

<!-- this is component HTML -->
<div class="controls dialog" class:showDialog>
  <h3>Contest Setup <img class="close" src="./check.svg" alt="X" on:click={closeDialog} title="click to save and close"></h3>
  <div class="panel basicPanel">
    <h4>Contest Name, Date</h4>
    <p class="tiny">Contest name</p>
    <div class="inputicon">
      <input type="text" placeholder="e.g. CQ WW" bind:value={$contestName} 
        on:keydown={searchContestName} />
      <img class="search" alt="Search" src="./search.png" on:dblclick={searchContestName} title="Double click to search rules"/>
    </div>
    <p class="tiny" title="Contest name to be displayed">Contest name (export)</p>
    <input type="text" placeholder="e.g. CQ-WW-DX" bind:value={$contestNameExport} />
    <button class="action" bind:this={newContestBtn} on:click={newContest}>New contest</button>
    <button class="action" bind:this={stopContestBtn} on:click={stopContest}>Stop contest</button>
    <button class="action" bind:this={restartContestBtn} on:click={restartContest}>Restart last contest</button>
    <button class="action" bind:this={finishContestBtn} on:click={finishContest}>Finish contest</button>
    <button class="action" >Restart older contest</button>
  </div>

  <div class="panel">
    <h4 class="wide">Contest Exchange</h4>
    <label><input type="checkbox" bind:checked={$hasRst} bind:this={hasRstCb} /> RS/RST</label>
    <label><input type="checkbox" bind:checked={$hasSerial} bind:this={hasSerialCb} /> Serial Number</label>
    <label><input type="checkbox" bind:checked={$hasGrid} bind:this={hasGridCb} /> WW Locator</label>
    <label><input type="checkbox" bind:checked={$hasExch1} bind:this={hasExch1Cb} /> fixed string 1</label>
    <div class="extra" class:nodisplay={!$hasExch1}>
      <!-- svelte-ignore a11y-label-has-associated-control -->
      <label class="tiny">LABEL</label>
      <!-- svelte-ignore a11y-label-has-associated-control -->
      <label class="tiny">LENGTH</label>
      <input type="text" class="first" maxlength="10" bind:value={$exch1Label} placeholder="Label" />
      <input type="number" maxlength="2" bind:value={$exch1Width} placeholder="Width" />
      <!-- svelte-ignore a11y-label-has-associated-control -->
      <label class="tiny double">TEXT TO SEND</label>
      <input class="double" type="text" maxlength="20" bind:value={$exch1Sent} placeholder="Type your sent code" />
    </div>
    <label><input type="checkbox" bind:checked={$hasExch2}  bind:this={hasExch2Cb} /> fixed string 2</label>
    <div class="extra" class:nodisplay={!$hasExch2}>
      <!-- svelte-ignore a11y-label-has-associated-control -->
      <label class="tiny">LABEL</label>
      <!-- svelte-ignore a11y-label-has-associated-control -->
      <label class="tiny">LENGTH</label>
      <input type="text" maxlength="10" class="first" bind:value={$exch2Label} placeholder="Label" />
      <input type="number" maxlength="2" bind:value={$exch2Width} placeholder="Width" />
      <!-- svelte-ignore a11y-label-has-associated-control -->
      <label class="tiny double">TEXT TO SEND</label>
      <input class="double" type="text" maxlength="20" bind:value={$exch2Sent} placeholder="Type your sent code" />
    </div>
  </div>

<label id="close-link" class="tiny right" on:click={closeDialog}>SAVE &amp; CLOSE</label>
</div>

<style type="text/scss">
  #close-link { grid-row: 3 / 4 ; grid-column: 1 / 4 ;}
  
  div.basicPanel {
    display: flex ;
    flex-flow: column ;
    align-content: stretch;
    justify-items: stretch ;
    button {
      width: 100% ;
      padding: 0.5em;
      margin: 0.5em 0 ;
      align-self: stretch;
      flex-basis: content;
    }
  }
  
  div.controls {
    display: grid;
    gap: 8px ;
  }
  
  div.dialog {
    right: 1em ;
  }

  div.extra {
    margin: 0 0 0 1.4em ;
    display: grid ;
    grid-template-columns: auto auto;
    gap: 6px ;
    justify-content: start ;
  }

  div.inputicon { position: relative }
  div.nodisplay { display: none; }

  .double { grid-column: span 2 ;}
  .wide { width: 26ch }
  
  h3 { grid-row: 1 / 2 ;  grid-column: 1 / 4 ; }
  h4 { 
    margin: 0 0 0.6rem 0 ; 
    padding: 4px ; 
    border-top: 1px solid black  ;
    color: black ;
    background: rgb(220, 224, 98);
  }
  
  img.search { height: 1em ; position: relative; top: 4px; right: 0; }

  input {
    margin-bottom: 1em;
    display: inline-block;
  }
  
  input[type="text"] {
    max-width: 100%;
  }
  
  input.first[type="text"] {
    max-width: 11ch;
  }
  
  input[type="number"] {
    max-width: 5ch;
  }
  
  label { display: block; user-select: none }
  
  label.right {
    text-align: right;
    width: 100%;
  }

  .panel {
    padding: 4px;
  }
</style>
