<script lang="ts">
  import BandControls from './BandControls.svelte'
  import ModeControls from './ModeControls.svelte'
  import ContestControls from './ContestControls.svelte'
</script>
<style>
  div.controls {
    background: #FCF ; 
    grid-column: 1 / 4 ;
    display: grid ;
    grid-template-columns: repeat(4, auto);
    gap: 6px ;
    padding: 6px ;
  }
</style>
<div class="controls" title="Control Panel">
  <BandControls />
  <ModeControls />
  <div class="rig">RIG CONTROLS</div>
  <div class="keyer">KEYER CONTROLS</div>
  <ContestControls />
</div>