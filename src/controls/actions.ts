export const keyMessages = {
  f1: "", f2: "", f3: "", f4: "", f6: "", f7: "", f8: ""
}

export function actionSendText( f: string ) : string  {
  let t: string ;
  if( keyMessages[ f ] ) t= keyMessages[f] ;
  else t= '' ;
  return t ;
}