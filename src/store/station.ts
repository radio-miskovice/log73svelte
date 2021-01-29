import { readable, writable } from 'svelte/store'

const init = {
  mycall: localStorage.getItem( 'mycall' ) || 'CALL?',
  mywwloc: localStorage.getItem('mywwloc') || 'JO70XA' ,
  myname: localStorage.getItem('myname') || 'name?' ,
  myqth: localStorage.getItem('myqth') || 'qth?' ,
  email: localStorage.getItem('email') || 'e-mail?',
}

export const time = readable( (new Date()).toISOString(),
  function start( set ) {
    const interval = setInterval( () => { set( (new Date()).toISOString() )}, 500 )
    return function stop() {
      clearInterval( interval )
    }
  }
)

export const mycall = writable<string>(init.mycall)
export const mywwloc = writable<string>(init.mywwloc)
export const myname = writable<string>(init.myname)
export const myqth = writable<string>(init.myqth)
export const email = writable<string>(init.email)

mycall.subscribe(x => localStorage.setItem('mycall', x.toUpperCase()))   // keep callsigns in upper case
mywwloc.subscribe(x => localStorage.setItem('mywwloc', x.toUpperCase())) // keep WW loc in upper case
myname.subscribe(x => localStorage.setItem('myname', x))
myqth.subscribe(x => localStorage.setItem('myqth', x))
email.subscribe(x => localStorage.setItem('email', x.toLowerCase()))
