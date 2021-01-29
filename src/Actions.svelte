<div id="actions" class="panel">
  <!-- svelte-ignore a11y-label-has-associated-control -->
  <label>ACTIONS</label>
  <div id="buttons">
    <button id="f1">F1: CQ</button>
    <button id="f2">F2: REPORT</button>
    <button id="f3">F3: TU 73</button>
    <button id="f4">F4: REPEAT</button>
    <button id="f6">F6: QRZ?</button>
    <button id="f7">F7: AGN?</button>
  </div>
</div>

<style>
  div#actions {
    grid-area: "act";
    grid-column: span 3 ;
    background: #fcc ;
  }
  div#buttons {
    display: block grid ;
    
  }
  button { width: 15ch; text-align: start }
</style>
