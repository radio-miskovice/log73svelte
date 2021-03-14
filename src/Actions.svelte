<div id="actions" class="panel">
  <div id="buttons">
    <button class="action" id="f1">F1: CQ</button>
    <button class="action" id="f2">F2: REPORT</button>
    <button class="action" id="f3">F3: TU 73</button>
    <button class="action" id="f4">F4: REPEAT</button>
    <button class="action" id="f6">F6: QRZ?</button>
    <button class="action" id="f7">F7: AGN?</button>
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
