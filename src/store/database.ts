var db : IDBDatabase ;

export function openDb() {
  const rq = indexedDB.open('challenger', 1)
  rq.onerror = (err) => {
    console.log('Database opening error')
    console.log(err)
  }
  rq.onupgradeneeded = ( event: IDBVersionChangeEvent ) => {
    let version = event.oldVersion
    while( version < event.newVersion ) {
      version++ ;
      switch( version ) {
        case 1:
          buildVersion1( event.target.result )
          break ;
      }
    }
  }
  rq.onsuccess = () => {
    db = rq.result
  }
}

function buildVersion1( db: IDBDatabase ) {
  const log = db.createObjectStore('log', { autoIncrement: true })
  log.createIndex('call', 'call', { unique: false })
  log.createIndex('utc', 'utcDateTime', { unique: false })
}