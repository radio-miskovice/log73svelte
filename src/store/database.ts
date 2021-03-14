import type { IContestDatarecord } from "./contest";
import Dexie from 'dexie' ;
import type { IQso } from "./contact";

const DB_NAME = 'challenger-dev2' // this name will be changed in the release version5

class ChallengerDatabase extends Dexie {
  contest: Dexie.Table<IContestDatarecord,string> ;
  log: Dexie.Table<IQso,string>;
  constructor() {
    super( DB_NAME ) ;
    this.version(1).stores({
      contest: 'id,startDate,name,deleted',
      log: 'id,mycall,call,utcDateTime,contestId,band,mode,deleted'
    });
  }
}

export const db = new ChallengerDatabase();
