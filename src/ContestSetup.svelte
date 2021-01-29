<script lang="ts">
  import {
    hasExch1,
    hasExch2,
    hasGrid,
    hasRst,
    hasSerial,
    exch1Label,
    exch1Width,
    exch2Label,
    exch2Width,
    contestName,
contestNameExport,
  } from "./store/contest";

  export let showDialog: boolean;

  function closeDialog(e) {
    showDialog = false;
  }
</script>

<!-- this is component HTML -->
<div class="controls dialog" class:showDialog>
  <h3>Contest Setup<img class="close" src="./check.svg" alt="X" on:click={closeDialog} title="click to save and close"></h3>
  <div class="panel basicPanel">
    <h4>Contest Name, Date</h4>

      <!-- svelte-ignore a11y-label-has-associated-control -->
      <label class="tiny">Contest name</label>
      <input type="text" placeholder="e.g. CQ WW" bind:value={$contestName} />

      <!-- svelte-ignore a11y-label-has-associated-control -->
      <label class="tiny">Contest name (export)</label>
      <input type="text" placeholder="e.g. CQ-WW-DX" bind:value={$contestNameExport} />

  </div>

  <div class="panel">
    <h4>Contest Exchange</h4>
    <label><input type="checkbox" bind:checked={$hasRst} /> Exchange RS/RST</label>
    <label><input type="checkbox" bind:checked={$hasSerial} /> Exchange Serial Number</label>
    <label><input type="checkbox" bind:checked={$hasGrid} /> Exchange WW Locator</label>
    <label><input type="checkbox" bind:checked={$hasExch1} />Exchange fixed string 1</label>
    <div class="extra" class:nodisplay={!$hasExch1}>
      <label class="tiny">LABEL</label>
      <label class="tiny">LENGTH</label>
      <input type="text" class="first" maxlength="10" bind:value={$exch1Label} placeholder="Label" />
      <input type="number" maxlength="2" bind:value={$exch1Width} placeholder="Width" />
    </div>
    <label><input type="checkbox" bind:checked={$hasExch2} /> Exchange fixed string 2</label>
    <div class="extra" class:nodisplay={!$hasExch2}>
      <label class="tiny">LABEL</label>
      <label class="tiny">LENGTH</label>
      <input type="text" maxlength="10" class="first" bind:value={$exch2Label} placeholder="Label" />
      <input type="number" maxlength="2" bind:value={$exch2Width} placeholder="Width" />
    </div>
  </div>
  <div class="panel">
    <h4>Date</h4>

    <!-- svelte-ignore a11y-label-has-associated-control -->
    <label class="tiny">Start</label>
    <input type="datetime-local" placeholder="YYYY-MM-DD HH:MM" />

    <!-- svelte-ignore a11y-label-has-associated-control -->
    <label class="tiny">End</label>
    <input type="datetime-local" placeholder="YYYY-MM-DD HH:MM" />
    
  </div>
  <!-- svelte-ignore a11y-label-has-associated-control -->
  <label id="close-link" class="tiny right" on:click={closeDialog}>SAVE &amp; CLOSE</label>
</div>

<style>
  #close-link { grid-row: 3 / 4 ; grid-column: 1 / 4 ;}

  div.controls {
    display: grid;
    gap: 8px ;
  }

  div.dialog {
    right: 0.5em ;
  }

  div.extra {
    margin: 0 0 0 1.4em ;
    display: grid ;
    grid-template-columns: auto auto ;
    gap: 6px ;
    justify-content: start ;
  }
  div.nodisplay { display: none; }

  h3 { grid-row: 1 / 2 ;  grid-column: 1 / 4 ; }
  h4 { 
    margin: 0 0 0.6rem 0 ; 
    padding: 4px ; 
    border-top: 1px solid black  ;
    color: black ;
    background: rgb(220, 224, 98);
  }
  label { display: block; }
  
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

  .panel {
    padding: 4px;
  }

  label.right {
    text-align: right;
    width: 100%;
  }
</style>
