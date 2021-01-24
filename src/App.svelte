<script lang="ts">
  export let version: string 
  import Header from './Header.svelte'
  import Controls from './Controls.svelte'
</script>

<main>
  <Header {version} />
  
  <Controls />
  <div id="entry">ENTRY</div>
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
  #entry { background: #CFF ; grid-column: 1 / 3 }
  #actions { background: #FCC ; grid-column: 3 / 5 }
  #hints { background: #CCF ;}
  #log { background: #CFC ; grid-column: 1 / 4}
  
</style>