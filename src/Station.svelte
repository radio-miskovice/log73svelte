<script lang="ts">
  import { onMount } from "svelte";

  import { mycall, mywwloc, myname, myqth, email } from "./store/station";
  export let showDialog: boolean;
  let validGrid: boolean;

  onMount(() => validateGrid());

  function closeOnEnter(event: KeyboardEvent) {
    if (event.code == "Enter") {
      event.preventDefault();
      showDialog = false;
    }
  }

  function closeDialog() {
    showDialog = false;
  }

  function validateGrid() {
    validGrid = !!$mywwloc.match(/^[A-R]{2}[0-9]{2}([A-X]{2})?$/i);
  }
</script>

<div class:showDialog class="dialog">
  <h3>MY STATION<img class="close" src="./check.svg" alt="X" on:click={closeDialog} title="click to save and close"></h3>
  <!-- svelte-ignore a11y-label-has-associated-control -->
  <label>My callsign:</label>
  <input
    class="upcase"
    type="text"
    bind:value={$mycall}
    maxlength="16"
    on:keypress={closeOnEnter}
  />
  <!-- svelte-ignore a11y-label-has-associated-control -->
  <label>Grid:</label>
  <input
    class="upcase wwloc"
    type="text"
    bind:value={$mywwloc}
    maxlength="8"
    on:keypress={closeOnEnter}
    on:change={validateGrid}
    class:invalid={!validGrid}
  />

  <!-- svelte-ignore a11y-label-has-associated-control -->
  <label>Operator name:</label>
  <input
    type="text"
    bind:value={$myname}
    maxlength="12"
    on:keypress={closeOnEnter}
  />

  <!-- svelte-ignore a11y-label-has-associated-control -->
  <label>QTH:</label>
  <input
    type="text"
    bind:value={$myqth}
    maxlength="20"
    on:keypress={closeOnEnter}
  />

  <!-- svelte-ignore a11y-label-has-associated-control -->
  <label>E-mail:</label>
  <input
    type="text"
    bind:value={$email}
    maxlength="32"
    on:keypress={closeOnEnter}
  />

  <!-- svelte-ignore a11y-label-has-associated-control -->
  <!-- svelte-ignore a11y-missing-attribute -->
  <label class="hint"
    >Click edit icon <img class="icon" src="./pencil-edit.svg" /> or press Enter
    in any input field to close the dialog. Data are saved automatically as you edit.</label
  >
</div>

<style>
  div.dialog {
    top: 1em;
    left: -15ch ;
    display: grid;
    row-gap: 6px;
    grid-template-columns: auto 1fr;
    width: 30ch;
  }

  label {
    padding: 0.2em;
  }
  label.hint {
    grid-column: 1 / 3;
    color: navy;
    font-size: smaller;
    font-style: italic;
    text-align: center;
    padding-top: 1em;
  }
  input {
    padding: 0.2em 0.4em;
    box-shadow: 2px 2px 2px silver;
    border: none;
    max-width: 17ch;
  }
  input.wwloc {
    max-width: 8ch;
  }
  input.invalid {
    color: red;
    text-decoration-style: wavy;
  }

  h3 {
    grid-column: 1 / 3;
  }

  img.icon {
    height: 1ch;
    background: red;
    padding: 3px;
    border-radius: 2px;
  }
  /*
  img.close {
    position: absolute ;
    top: 4px ;
    right: 4px ;
    height: 1.25em ;
  }
  */
</style>
