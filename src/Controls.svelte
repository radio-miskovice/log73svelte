<script lang="ts">
  import BandControls from './BandControls.svelte'
  import ModeControls from './ModeControls.svelte'
</script>
<style>
  div.controls {
    background: #FCF ; 
    grid-column: 1 / 5 ;
    display: grid ;
    grid-template-columns: repeat(5, auto);
    gap: 6px ;
    padding: 6px ;
  }
</style>
<div class="controls" title="Control Panel">
  <BandControls />
  <ModeControls />
  <div class="rig">RIG CONTROLS</div>
  <div class="keyer">KEYER CONTROLS</div>
  <div class="contest">CONTEST CONTROLS</div>
</div>