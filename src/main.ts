import App from './App.svelte';
import { db } from './store/database';
import { actionSendText } from './controls/actions';


const app = new App({
	target: document.body,
	props: {
		version: '0.1.1-alpha'
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
    console.log( `Key pressed: ${e.key}` )
    console.log(actionSendText(e.key));
  }
  // let { ctrlKey, shiftKey, altKey, metaKey, key } = e ;
  // console.log(`${ctrlKey? 'CTRL+' : ''}${altKey? 'ALT+':''}${shiftKey?'SHIFT+':''}${key}`);
}

export default app;