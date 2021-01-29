<script lang="ts">
  export let version: string 
  import Header from './Header.svelte'
  import Controls from './Controls.svelte'
  import Entry from './Entry.svelte'
  import Actions from './Actions.svelte'
  import Hints from './Hints.svelte'
  import LogView from './LogView.svelte'
</script>

<main>
  <Header {version} />
  <Controls />
  <Entry />
  <Actions />
  <LogView />
  <Hints />
</main>

<style>
	main {
		display: grid ;
    margin: 0 auto;
    gap: 3px ;
    grid-template-areas:
      "hdr hdr hdr" ,
      "ctl ctl ctl" ,
      "ent ent ent" ,
      "act act act",
      "log log hint" ,
    ;  
    grid-auto-columns: fit-content ;
    max-width: 1024px ;
  }
  
</style>