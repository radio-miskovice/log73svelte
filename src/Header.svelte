<script lang="ts">
  import Station from "./Station.svelte";
  import { time, mycall, mywwloc } from "./store/station";
  export let version: string;
  const date = (t: string) => t.slice(0, 10);
  const hhmm = (t: string) => t.slice(11, 16);
  const secs = (t: string) => t.slice(16, 19);
  let showDialog: boolean = false;

  function toggleStationDialog() {
    showDialog = !showDialog;
  }
</script>

<div>
  <p>Contest Challenger V{version}</p>
  <p>
    {$mycall.toUpperCase()} in {$mywwloc.toUpperCase()}
    <svg class="icon" on:click={toggleStationDialog}>
      <use xlink:href="#icon-edit" />
    </svg>
    <!-- <img
      class="inline icon"
      src="./pencil-edit.svg"
      on:click={toggleStationDialog}
      alt="edit station"
    /> -->
  </p>
  <p class="clock">
    UTC {date($time)}
    {hhmm($time)}<small>{secs($time)}</small>
  </p>
  <Station bind:showDialog />
</div>

<style>
  div {
    grid-area: "hdr";
    grid-column: span 3 ;

    background: red;
    color: white;

    display: flex;
    flex-flow: row;
    justify-items: stretch;
    justify-content: space-between;
    align-items: stretch;
    align-content: stretch;
  }
  p {
    display: inline-block;
    margin: 0;
    padding: 3px;
    position: relative ;
  }
  p.clock {
    text-align: right;
    font-family: "Roboto Mono";
  }
  small {
    color: yellow;
  }
  svg.icon {
    height: 1rem;
    width: 1rem ;
    position: relative;
    top: 1px;
    padding-left: 0.5ch;
    stroke: white ;
    fill: white ;
  }
</style>
