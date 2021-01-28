<script lang="ts">
  export let version: string 
  import Header from './Header.svelte'
  import Controls from './Controls.svelte'
  import Entry from './Entry.svelte'
</script>

<main>
  <Header {version} />
  <Controls />
  <Entry />

  <div id="actions">ACTIONS</div>
  <div id="log">LOG VIEW</div>
  <div id="hints">HINTS</div>
</main>

<style>
	main {
		display: grid ;
    margin: 0 auto;
    gap: 3px ;
    grid-template-columns: auto ;
    max-width: 1024px ;
  }
  #actions { background: #FCC ; max-width: 100%; grid-column: 2 / 4 }
  #hints { background: #CCF ; grid-column: 3 / 4 }
  #log { background: #CFC ; grid-column: 1 / 3}
  
</style>