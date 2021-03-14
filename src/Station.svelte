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
  <p>My callsign:</p>
  <input
    class="upcase"
    type="text"
    bind:value={$mycall}
    maxlength="16"
    on:keypress={closeOnEnter}
  />
  <p>Grid:</p>
  <input
    class="upcase wwloc"
    type="text"
    bind:value={$mywwloc}
    maxlength="8"
    on:keypress={closeOnEnter}
    on:change={validateGrid}
    class:invalid={!validGrid}
  />

  <p>Operator name:</p>
  <input
    type="text"
    bind:value={$myname}
    maxlength="12"
    on:keypress={closeOnEnter}
  />

  <p>QTH:</p>
  <input
    type="text"
    bind:value={$myqth}
    maxlength="20"
    on:keypress={closeOnEnter}
  />

  <p>E-mail:</p>
  <input
    type="text"
    bind:value={$email}
    maxlength="32"
    on:keypress={closeOnEnter}
  />

  <p class="tiny right" on:click={closeDialog}>SAVE &amp; CLOSE &nbsp;</p>
</div>

<style>
  div.dialog {
    top: 1em;
    left: 50% ;
    margin-left: -10em ;
    display: grid;
    row-gap: 6px;
    grid-template-columns: auto 1fr;
    width: 20em;
  }

  p {
    padding: 0 0.5em;
    color: black ;
    text-align: right ;
  }

  p.tiny.right {
    color: gray ;
    user-select: none ;
    grid-column: 2 / 3 ;
    max-width: 100% ;
    padding: 4px;
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

</style>
