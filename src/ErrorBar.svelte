<script lang="ts">
import { errorMsg } from "./store/error";
let noError = true 
$: { noError = ( $errorMsg == null || $errorMsg == undefined || $errorMsg == '' )}
</script>
<div id="errorBar" class:hidden={noError} >
  <p class="errorMsg">{$errorMsg}</p>
  <button class="action" on:click={(e) => errorMsg.set(undefined) }>Dismiss</button>
</div>
<style type="text/scss">
  div#errorBar { 
    // grid-column: span 2 ;
    background: rgba(255, 0, 0, 0.551) ;
    color : yellow ;
    display: flex ;
    flex-flow: column ;
    justify-content: space-between ;
    align-content: stretch;
    align-items: center ;
    align-self: stretch ;

    padding: 2px ;
    min-width: 100% ;
    p { text-align: center; display: inherit ; }
    button {  min-width: max-content; margin-bottom: 0.5em }
    &.hidden {  visibility: hidden ; 
      p { visibility: hidden }
    }
  }
</style>