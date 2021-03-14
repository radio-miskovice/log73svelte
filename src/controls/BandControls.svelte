<script lang="ts">
  import { ALL_BANDS, currentBand, selectedBandsString } from "../store/bands";
  import type { IBand, SelectableBand } from "../store/bands";
  import BandSelector from "./BandSelector.svelte";

  let showDialog: boolean = false; // control band selection dialog
  let initialSelection = $selectedBandsString.split("|"); // persistent selection
  let bands: SelectableBand[] = ALL_BANDS.map((band) => ({
    band,
    selected: false,
  }));

  for (let i = 0; i < bands.length; i++) {
    const bandID = bands[i].band.id;
    const selected = initialSelection.find((x) => x == bandID);
    if (bandID == selected || bandID == $currentBand) {
      bands[i].selected = true;
    }
  }

  function selectBand(event: any) {
    const c = event.currentTarget;
    $currentBand = c.id;
  }

  function openDialog() {
    showDialog = true;
  }
</script>

<!-- svelte-ignore a11y-label-has-associated-control -->
<div class="component">
  <p class="tiny" on:click={openDialog}>SELECT BANDS <svg class="icon"><use xlink:href="#icon-config" stroke="black" /></svg></p>
  <ul class="buttonPanel">
    {#each bands as selectable}
      {#if selectable.selected}
        <li>
          <label
            class="band"
            id={selectable.band.id}
            title={selectable.band.alt}
            class:selected={selectable.band.id === $currentBand}
            on:click={selectBand}>{selectable.band.id}</label
          >
        </li>
      {/if}
    {/each}
  </ul>
  <BandSelector bind:showDialog bind:bands />
</div>

<style>
  div.component {
    grid-row: 1 / 2;
  }
  /* ul {
    list-style-type: none;
    font-size: smaller;
    display: grid;
    grid-template-columns: repeat(4,auto);
    margin: 0;
    padding: 0;
  }
  li {
    display: block;
    margin: 0 ;
    padding: 2px;
  } */
  label.band {
    text-align: center;
    color: silver;
    background: rgb(138, 16, 142);
    border-radius: 3px;
    width: 6ch;
    padding: 3px;
  }
  label.band.selected {
    color: white;
    font-weight: bold;
  }

</style>
