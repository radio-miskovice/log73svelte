import App from './App.svelte';
import { db } from './store/database';


const app = new App({
	target: document.body,
	props: {
		version: '0.0.5-alpha'
	}
});

console.log(document.documentURI.match(/\/\?nodb=/) )

if(document.documentURI.match(/\/\?nodb=/)) {
  console.log('DB opening skipped')
}
else {
  console.log('Opening database')
  db.open().then( () => console.log('Database open')).catch((e) => console.log(e));
}

document.onkeydown = ( e: KeyboardEvent ) => {
  // TODO: F1-F12, Esc, Ctrl-Esc
  if( e.key.match(/^F\d+$/)) {
    e.stopImmediatePropagation();
    e.preventDefault();
    // TODO: handle F-key events
  }
  // let { ctrlKey, shiftKey, altKey, metaKey, key } = e ;
  // console.log(`${ctrlKey? 'CTRL+' : ''}${altKey? 'ALT+':''}${shiftKey?'SHIFT+':''}${key}`);
}

export default app;