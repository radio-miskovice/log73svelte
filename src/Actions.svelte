<script lang="ts">
  import { actionSendText } from "./controls/actions";
  function buttonPressed( e: Event ) {
    let t = e.target ;
    console.log( t )
    console.log( `${t.id} pressed.` )

  }
</script>
<div id="actions" class="panel">
  <div id="buttons">
    <button class="action" id="f1" on:click={buttonPressed}>F1: CQ</button>
    <button class="action" id="f2" on:click={buttonPressed}>F2: REPORT</button>
    <button class="action" id="f3" on:click={buttonPressed}>F3: TU 73</button>
    <button class="action" id="f4" on:click={buttonPressed}>F4: REPEAT</button>
    <button class="action" id="f6" on:click={buttonPressed}>F6: QRZ?</button>
    <button class="action" id="f7" on:click={buttonPressed}>F7: AGN?</button>
  </div>
</div>

<style>
  div#actions {
    grid-area: "act";
    grid-column: span 3 ;
    background:#cff ;
  }
  div#buttons {
    display: block flex ;
    flex-flow: row wrap ;
  }
  button { width: 8rem ; height: 1.6rem; font-weight: bold; margin: 6px }
</style>
