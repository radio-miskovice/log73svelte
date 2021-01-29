<script lang="ts">
  import { contestName } from "./store/contest";
  import ContestSetup from './ContestSetup.svelte'

  let showDialog = false

  function openDialog() {
    showDialog = true
  }

</script>

<!-- this is component HTML -->
<div class="controls">
  <!-- svelte-ignore a11y-label-has-associated-control -->
  <label class="tiny" on:click={openDialog} >CONFIGURE CONTEST &gt;&gt;</label>
  <!-- svelte-ignore a11y-label-has-associated-control -->
  <label>{$contestName}</label>
  <ContestSetup bind:showDialog />
</div>

<style>
  div.controls {
    display: flex;
    flex-flow: column;
    position: relative ;
    z-index: 1 ;
  }

</style>
