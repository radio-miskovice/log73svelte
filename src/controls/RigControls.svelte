<script lang="ts">
  import { systemHasSerial } from '../store/interfaces'
  const serialSupport = systemHasSerial()

</script>
<div class="rig">
  <p class="alert" class:unavailable={!serialSupport}>
    {#if serialSupport}
    SETUP CAT
    {:else}
    SERIAL CAT UNAVAILABLE
    {/if}
  </p>
</div>
<style>
  div.rig { 
    padding: 0 1rem ;
    border-left: thin solid #f8f ;
    grid-row: span 2 ;
  }
  p.alert { max-width: 10rem  ; background: yellow ; color: black;  padding: 2px; 
    border-radius: 3px; border: 1px solid black;
    text-align: center; font-size: small ; margin: auto  
  }
  p.alert.unavailable {
    color: yellow; background: darkred ;
  }
</style>