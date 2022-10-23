<script lang="ts">
  import { contestId, contestName, endUtc, startUtc } from "../store/contest";
  import ContestSetup from './ContestSetup.svelte'

  let showDialog = false
  let startUtcString : string | null ;

  $: {
    startUtcString = ($startUtc)?.toISOString().slice(0,16).replace('T', ' ') || '' ;
  }

  function openDialog() {
    showDialog = true
  }

</script>

<!-- this is component HTML -->
<div class="contest">
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <p  on:click={openDialog}> 
    <span class:crossed={$contestId === null}>{$contestName}</span>
    <svg class="icon black"><use xlink:href="#icon-edit" /></svg>
  </p>
  <p class:hidden={$contestId == null}>{startUtcString}</p>
  <p class="alert" class:dimmed={$contestId == null}>
    {$contestId === null ? '[not active]' : ( $endUtc ? 'FINISHED' : 'ACTIVE' ) }
  </p>
  <ContestSetup bind:showDialog />
</div>

<style>
  div.contest {
    background: #fcf;
    padding-left: 1rem ;
    border-left: 1px solid #f8f ;
    grid-row: span 2 ;
    display: flex;
    flex-flow: column;
    position: relative ;
    z-index: 1 ;
  }
  .crossed{ text-decoration: line-through ;}
  .hidden { visibility: hidden; }
  svg.icon {  stroke: rgb(92, 92, 92) }
  p.dimmed { background:rgb(92, 92, 92); color: #ccc }

</style>
