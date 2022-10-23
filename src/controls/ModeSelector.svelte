<script lang="ts">
  import { currentMode, selectedModesString } from "../store/modes";
  import type { SelectableMode } from "../store/modes";
  export let showDialog: boolean;
  export let modes: SelectableMode[];

  function checkOneMode(event: Event) {
    const t: any = event.target;
    console.log(t);
    if ($currentMode == t.id && !t.checked) 
    $currentMode = '' ;
    if( $currentMode == '' )
      for (const m of modes) {
        if (m.selected) {
          $currentMode = m.id;
          return;
        }
      }
  }

  function closeDialog( e: Event ) {
    const selectedModes = modes
      .filter((m) => m.selected)
      .map((m) => m.id)
      .join("|");
    $selectedModesString = selectedModes;
    showDialog = false;
  }
</script>

<div class:showDialog class="dialog">
  <h3>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    Select modes to use:<img
      class="close"
      src="./check.svg"
      alt="X"
      on:click={closeDialog}
      title="click to save and close"
    />
  </h3>
  <ul class="modes">
    {#each modes as mode}
      <li>
        <label><input type="checkbox" id={mode.id} bind:checked={mode.selected}
            on:change={checkOneMode} /> {mode.id}</label>
      </li>
    {/each}
  </ul>
  <!-- svelte-ignore a11y-label-has-associated-control -->
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <label class="tiny" on:click={closeDialog}>SAVE &amp; CLOSE &gt;&gt</label>
</div>

<style>

  ul.modes {
    list-style-type: none;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 4px;
    margin: 0;
    padding: 0;
  }
  ul.modes label {
    padding: 3px;
  }
  label.tiny {
    font-size: x-small;
    color: gray;
    text-align: right;
    text-transform: uppercase;
    width: 100%;
  }
  input[type="checkbox"] {
    padding-top: 2px;
  }
  img.close {
    left: 4px;
  }
</style>
