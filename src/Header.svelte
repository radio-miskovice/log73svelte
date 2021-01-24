<script lang="ts">
  import Station from './Station.svelte'
  import { time, mycall } from './store/station'
  export let version: string
  const date = ( t: string ) => t.slice(0,10)
  const hhmm = (t: string ) => t.slice(11, 16)
  const secs = (t: string ) => t.slice(16, 19)
  let visible : boolean = false

  function toggleStationDialog() {
    visible = !visible
  }
</script>
<style>
  div { display: flex ; flex-flow: row ; 
    justify-items: stretch;
    justify-content: space-between;
    align-items: stretch;
    align-content: stretch;
    background: red ; color: white ; grid-column: 1 / 5 ;
  }
  p { display : inline-block; margin: 0; padding: 3px }
  p.clock { text-align: right ; font-family: 'Roboto Mono';}
  small { color: yellow }
  img.icon { height: 0.7em ; width: auto; position: relative; top: 1px; padding-left: 0.5ch  }
</style>
<div>
  <p>Mouse Logger V{version}</p>
  <p class="upcase">{$mycall}<img class="inline icon" src="./pencil-edit.svg" on:click={toggleStationDialog}/></p>
  <p class="clock">UTC {date($time)} {hhmm($time)}<small>{secs($time)}</small></p>
</div>
<Station {visible} />