<script lang="ts">
  import BandControls from "./BandControls.svelte";
  import ModeControls from "./ModeControls.svelte";
  import ContestControls from "./ContestControls.svelte";
</script>

<div id="controls">
  <BandControls />
  <ModeControls />
  <div class="rig">RIG CONTROLS</div>
  <div class="keyer">KEYER CONTROLS</div>
  <ContestControls />
</div>

<style>
  div#controls {
    grid-area: "ctl";
    grid-column: span 3 ;

    background: #fcf;
    padding: 6px;

    display: grid;
    grid-template-columns: repeat(4, auto);
    gap: 6px;
  }
</style>
