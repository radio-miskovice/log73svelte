<script lang="ts">
  export let version: string 
  import Actions from './Actions.svelte'
  import Controls from './Controls.svelte'
  import Entry from './Entry.svelte'
  // import ErrorBar from './ErrorBar.svelte'
  import Header from './Header.svelte'
  import Hints from './Hints.svelte'
  import LogView from './LogView.svelte'
  // import { xlink_attr } from 'svelte/internal'
</script>
<main>
  <Header {version} />
  <Controls />
  <Entry />
  <Actions />
  <LogView />
  <Hints />
</main>

<svg display="none">
  <symbol id="icon-edit" viewBox="0 0 528.899 528.899">
    <path d="M328.883,89.125l107.59,107.589l-272.34,272.34L56.604,361.465L328.883,89.125z M518.113,63.177l-47.981-47.981
		c-18.543-18.543-48.653-18.543-67.259,0l-45.961,45.961l107.59,107.59l53.611-53.611
		C532.495,100.753,532.495,77.559,518.113,63.177z M0.3,512.69c-1.958,8.812,5.998,16.708,14.811,14.565l119.891-29.069
		L27.473,390.597L0.3,512.69z"/>
  </symbol>
  <symbol id="icon-no-edit" viewBox="0 0 528.899 528.899">
    <path d="M328.883,89.125l107.59,107.589l-272.34,272.34L56.604,361.465L328.883,89.125z M518.113,63.177l-47.981-47.981
		c-18.543-18.543-48.653-18.543-67.259,0l-45.961,45.961l107.59,107.59l53.611-53.611
		C532.495,100.753,532.495,77.559,518.113,63.177z M0.3,512.69c-1.958,8.812,5.998,16.708,14.811,14.565l119.891-29.069
    L27.473,390.597L0.3,512.69z"/>
    <path d="M50,50l-50,50l420,420l50,-50z" />
  </symbol>
  <symbol id="icon-config" viewBox="0 -256 1792 1792">
    <g transform="matrix(1,0,0,-1,53.152542,1217.0847)">
        <path d="m 384,64 q 0,26 -19,45 -19,19 -45,19 -26,0 -45,-19 -19,-19 -19,-45 0,-26 19,-45 19,-19 45,-19 26,0 45,19 19,19 19,45 z m 644,420 -682,-682 q -37,-37 -90,-37 -52,0 -91,37 L 59,-90 Q 21,-54 21,0 21,53 59,91 L 740,772 Q 779,674 854.5,598.5 930,523 1028,484 z m 634,435 q 0,-39 -23,-106 Q 1592,679 1474.5,595.5 1357,512 1216,512 1031,512 899.5,643.5 768,775 768,960 q 0,185 131.5,316.5 131.5,131.5 316.5,131.5 58,0 121.5,-16.5 63.5,-16.5 107.5,-46.5 16,-11 16,-28 0,-17 -16,-28 L 1152,1120 V 896 l 193,-107 q 5,3 79,48.5 74,45.5 135.5,81 61.5,35.5 70.5,35.5 15,0 23.5,-10 8.5,-10 8.5,-25 z"/>
    </g>
  </symbol>
</svg>

<style>
	main {
		display: grid ;
    margin: 0 auto;
    gap: 3px ;
    grid-template-areas:
      "hdr hdr hdr" ,
      "ctl ctl ctl" ,
      "ent ent ent" ,
      "act act act" ,
      "log log hint" ;  
    grid-auto-columns: fit-content ;
    grid-template-rows: repeat(4, auto) 1fr ;
    max-width: 1024px ;
    height: 100% ;
    height: 100vh ;
  }
</style>