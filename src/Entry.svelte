<!-- Entry panel for contest logging, the actual input -->
<script lang="ts">
  import {
    hasExch1, hasExch2, hasGrid, hasRst, hasSerial,
    exch1Label, exch1Width, exch2Label, exch2Width,
    exch1Sent, exch2Sent,
  } from "./store/contest";
  import { currentMode } from "./store/modes";
  import { mycall, mywwloc } from "./store/station";

  const OPER_SP = 'S&P'
  const OPER_CQ = 'CQ'
  let defaultRst: string;
  let editing =  false ;
  let operationMode = OPER_SP ;

  $: defaultRst = defaultReportForMode($currentMode);

  function defaultReportForMode(mode: string): string {
    if (mode.match(/^(AM|FM|SSB|LSB|USB)$/)) return "59";
    else return "599";
  }

  function toggleOperationMode( e: Event ) {
    operationMode = (operationMode == OPER_SP) ? OPER_CQ : OPER_SP
  }

  function toggleEditSent( e : Event ) {
    editing = !editing ;
  }
</script>

<div id="entry" class="panel">
  <div class="form">
      <!-- svelte-ignore a11y-label-has-associated-control -->
      <label class="small row1">CALL</label>
      <!-- svelte-ignore a11y-label-has-associated-control -->
      <label class="small row1" class:nodisplay={!$hasRst}>RST</label>
      <!-- svelte-ignore a11y-label-has-associated-control -->
      <label class="small row1" class:nodisplay={!$hasSerial}>SERIAL</label>
      <!-- svelte-ignore a11y-label-has-associated-control -->
      <label class="small row1" class:nodisplay={!$hasGrid}>WWLOC</label>
      <!-- svelte-ignore a11y-label-has-associated-control -->
      <label class="small row1" class:nodisplay={!$hasExch1}>{$exch1Label || "EXCH1"}</label>
      <!-- svelte-ignore a11y-label-has-associated-control -->
      <label class="small row1" class:nodisplay={!$hasExch2}    >{$exch2Label || "EXCH2"}</label>

      <input id="call" type="text" class="call row2" maxlength="14" autocomplete="off"  />
      <input type="text" class="report row2" maxlength="3" placeholder={defaultRst} class:nodisplay={!$hasRst} autocomplete="off"  />
      <input type="text" class="serial row2" maxlength="5" class:nodisplay={!$hasSerial} autocomplete="off"  />
      <input type="text" class="wwloc row2" maxlength="6" class:nodisplay={!$hasGrid} autocomplete="off"  />
      <input type="text" class="extra row2" class:nodisplay={!$hasExch1} maxlength={$exch1Width || 5} autocomplete="off"  />
      <input type="text" class="extra row2" class:nodisplay={!$hasExch2} maxlength={$exch2Width || 5} autocomplete="off"  />

      <!-- button area -->
      <div id="logQso" class="row3" >
        <button class="action" on:click={toggleOperationMode}>{operationMode}</button>
        <button class="action">Log!</button>
      </div>
      <input type="text" class="report row3" maxlength="3" placeholder={defaultRst} class:nodisplay={!$hasRst} />

      <!-- TODO: create serial number array -->
      <input type="text" disabled class="serial row3 sent" maxlength="5" class:nodisplay={!$hasSerial} />

      <!-- edit sent code in-place -->
      {#if (editing) }
      <input type="text" class="wwloc row3 sent" maxlength="6" bind:value={$mywwloc} class:nodisplay={!$hasGrid} />
      <input type="text" class="extra row3 sent" class:nodisplay={!$hasExch1} maxlength={$exch1Width || 5}    bind:value={$exch1Sent} />
      <input type="text" class="extra row3 sent" class:nodisplay={!$hasExch2} maxlength={$exch2Width || 5}    bind:value={$exch2Sent} />
      {:else}  
      <input type="text" disabled class="wwloc row3 sent" maxlength="6" bind:value={$mywwloc} class:nodisplay={!$hasGrid} />
      <input type="text" disabled class="extra row3 sent" class:nodisplay={!$hasExch1} maxlength={$exch1Width || 5}    value={$exch1Sent} autocomplete="off"  />
      <input type="text" disabled class="extra row3 sent" class:nodisplay={!$hasExch2} maxlength={$exch2Width || 5}    value={$exch2Sent} autocomplete="off"  />
      {/if}
  </div>
  <!-- panel tlacitek a provoznich akci -->
  <div class="vertical">
    <label class="small config">
      <input type="checkbox" bind:checked={editing}>EDIT SENT TEXT</label>
  </div>
</div>

<style type="text/scss" >
  div#entry {
    grid-area: "ent";
    grid-column: span 3 ;
    background: #cff;
    display: flex ;
    flex-flow: row ;
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
    grid-row: 1 / 4;
    margin: 0 0 0 3rem  ;
    width: 100%  ;
    display: flex ;
    flex-flow: column wrap ;
    padding: 2px 8px ;
    border: 1px solid gray ;
  }

  label.config { width: max-content }
  label.small input[type=checkbox] { position: relative; top: 2px }

</style>
