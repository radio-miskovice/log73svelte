<script lang="ts">
  import BandControls from "./controls/BandControls.svelte";
  import ModeControls from "./controls/ModeControls.svelte";
  import KeyerControls from "./controls/KeyerControls.svelte";
  import ContestControls from "./controls/ContestControls.svelte";
  import RigControls from "./controls/RigControls.svelte";
</script>

<div id="controls">
  <BandControls />
  <ModeControls />
  <RigControls />
  <KeyerControls />
  <ContestControls />
</div>

<style>
  div#controls {
    grid-area: "ctl";
    grid-column: span 3 ;

    background: #fcf;
    padding: 6px;

    display: grid;
    grid-template-columns: minmax(12em, 31%) auto max-content max-content ;
  }
</style>
