import { writable } from "svelte/store";

const ERROR_MSG = 'errorMsg'
const initErrorMsg = localStorage.getItem(ERROR_MSG)
export const errorMsg = writable<string>( initErrorMsg )
errorMsg.subscribe(value => {
  if( value == undefined || value == null || value == '') {
    localStorage.removeItem(ERROR_MSG) ;
  }
  else {  localStorage.setItem(ERROR_MSG, value) }
})