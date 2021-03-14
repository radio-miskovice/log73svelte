<script lang="ts">
  import { systemHasSerial } from '../store/keyer'
  const serialSupport = systemHasSerial()

</script>
<div class="keyer">
  {#if !serialSupport }
  <p class="alert">KEYER NOT SUPPORTED</p>
  {:else}   <p class="alert">SERIAL CONNECTION SUPPORTED</p>

  {/if}
</div>
<style>
  div.keyer { 
    padding: 0 1rem ;
    border-left: thin solid #f8f ;
    grid-row: span 2 ;
  }
  p.alert { max-width: 10rem  }
</style>