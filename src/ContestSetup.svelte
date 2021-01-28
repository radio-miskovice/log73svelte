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
  } from "./store/contest";

  export let showDialog: boolean 

  function closeDialog( e ) {
    showDialog = false
  }

</script>

<!-- this is component HTML -->
<div class="controls dialog" class:showDialog>
  <h3>Contest Setup</h3>
  <h4>Contest name, date</h4>
  <div class="panel basicPanel">
    <!-- svelte-ignore a11y-label-has-associated-control -->
    <label class="tiny">Contest name</label>
    <input type=text placeholder="e.g. CQ WW" bind:value={$contestName}>
    <!-- svelte-ignore a11y-label-has-associated-control -->
    <label class="tiny">Contest name (Cabrillo)</label>
    <input type=text placeholder="e.g. CQ-WW-DX">
  </div>
  <div class="panel">
    <label
      ><input type="checkbox" bind:checked={$hasRst} /> Exchange RS/RST</label
    >
    <label
      ><input type="checkbox" bind:checked={$hasSerial} /> Exchange Serial Number</label
    >
    <label
      ><input type="checkbox" bind:checked={$hasGrid} /> Exchange WW Locator</label
    >
    <label
      ><input type="checkbox" bind:checked={$hasExch1} />Exchange fixed string 1</label
    >
    <div class:nodisplay={!$hasExch1}>
      <input
        type="text"
        bind:value={$exch1Label}
        maxlength="10"
        class="first"
        placeholder="Label"
      />
      <input
        type="number"
        bind:value={$exch1Width}
        maxlength="2"
        placeholder="Width"
      />
    </div>
    <label
      ><input type="checkbox" bind:checked={$hasExch2} /> Exchange fixed string 2</label
    >
    <div class:nodisplay={!$hasExch2}>
      <input
        type="text"
        bind:value={$exch2Label}
        maxlength="10"
        class="first"
        placeholder="Label"
      />
      <input
        type="number"
        bind:value={$exch2Width}
        maxlength="2"
        placeholder="Width"
      />
    </div>
  </div>
  <!-- svelte-ignore a11y-label-has-associated-control -->
  <label class="tiny right" on:click={closeDialog}>SAVE &amp; CLOSE</label>
</div>

<style>
  div.controls {
    display: flex;
    flex-flow: column;
  }
  div.dialog {
    position: absolute ;
    right: 0 ;
    width: max-content ;
    visibility: hidden ;
    transform: scale(0) ;
    z-index: -1 ;
    animation: hide 0.2s ;
  }
  div.dialog.showDialog {
    visibility: visible ;
    transform: scale(1) ;
    z-index: 3 ;
    animation: show 0.2s ;
  }
  h4 { margin: 0 ;}
  label {
    display: block;
  }
  .nodisplay {
    display: none;
  }
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
    max-width: 4ch;
  }
  .panel {
    border: 1px solid rgb(91, 7, 77);
    padding: 4px
  }
  label.right {  text-align: right; width: 100% }
</style>
