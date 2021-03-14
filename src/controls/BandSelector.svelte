<script lang="ts">
  import type { SelectableBand } from "../store/bands";
  import { selectedBandsString, currentBand } from "../store/bands";
  export let showDialog: boolean;
  export let bands: SelectableBand[];

  function setOnlyContestBands() {
    for (let i = 0; i < bands.length; i++) {
      bands[i].selected = bands[i].selected && bands[i].band.ct;
      if (bands[i].selected) $currentBand = bands[i].band.id;
    }
  }

  function setWholeRange(event) {
    const t = event.currentTarget;
    for (let i = 0; i < bands.length; i++) {
      if (bands[i].band.rc === t.id) {
        bands[i].selected = t.checked;
        if (t.checked) $currentBand = bands[i].band.id;
      }
    }
  }

  function checkOneBand(event) {
    const t = event.currentTarget;
    if ($currentBand == t.id && !t.checked) {
      for (const b of bands) {
        if (b.selected) {
          $currentBand = b.band.id;
          return;
        }
      }
      $currentBand = "";
    }
  }

  function closeDialog(e) {
    const selectedBands = bands
      .filter((b) => b.selected)
      .map((b) => b.band.id)
      .join("|");
    $selectedBandsString = selectedBands;
    showDialog = false;
  }
</script>

<div class:showDialog class="dialog" title="Select bands">
  <h3>
    <img class="close left" src="./check.svg" alt="X" on:click={closeDialog} title="click to save and close"> 
    Select bands to work on:
  </h3>
  <!-- svelte-ignore a11y-label-has-associated-control -->
  <label class="contest" on:click={setOnlyContestBands}
    >CLICK HERE: ONLY CONTESTING BANDS</label
  >
  <ul class="ranges">
    {#each ["lf", "hf", "vhf", "uhf", "shf", "ehf"] as range}
      <li class="range">
        <label class="range"
          ><input type="checkbox" id={range} on:change={setWholeRange} />
          {range.toUpperCase()}</label
        >
        <ul class="bands">
          {#each bands.filter((x) => x.band.rc === range) as band}
            <li>
              <label title={band.band.alt}>
                <input
                  type="checkbox"
                  id={band.band.id}
                  bind:checked={band.selected}
                  on:change={checkOneBand}
                />
                {band.band.id}</label
              >
            </li>
          {/each}
        </ul>
      </li>
    {/each}
  </ul>
  <!-- svelte-ignore a11y-label-has-associated-control -->
  <label class="tiny" on:click={closeDialog}>SAVE &amp; CLOSE &gt;&gt</label>
</div>

<style>
  div {
    left: 0;
  }

  ul.ranges {
    list-style-type: none;
    display: flex;
    flex-flow: row nowrap;
    flex: 1 0;
    justify-content: space-evenly;
    align-items: stretch;
    align-content: flex-start;
    margin: 0;
    padding: 0;
  }
  ul.ranges > li {
    border: 0 0 1px 0 solid gray;
    width: 10ch;
  }
  ul.bands {
    list-style-type: none;
    display: flex;
    flex-flow: column;
    align-content: stretch;
    justify-content: space-evenly;
    margin: 0;
    padding: 0;
  }
  ul.bands label {
    padding: 3px;
  }
  label.range {
    font-weight: bold;
    padding: 3px;
    border-top: 1px solid gray;
    background: rgb(220, 224, 98);
  }
  label.tiny {
    font-size: x-small;
    color: gray;
    text-align: right;
    text-transform: uppercase;
    width: 100%;
  }
  label.contest {
    font-size: x-small;
    color: gray;
    text-align: center;
    text-transform: uppercase;
    width: 100%;
  }
  input[type="checkbox"] {
    padding-top: 2px;
  }
  img.close.left {
    left: 4px ;
  }
</style>
