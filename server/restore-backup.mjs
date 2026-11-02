// Stop RCT Manager before running: node server/restore-backup.mjs rct-...sqlite
import {DatabaseSync} from 'node:sqlite';
import {join,basename,resolve} from 'node:path';
import {copyFileSync,existsSync,mkdirSync} from 'node:fs';
const root=resolve(import.meta.dirname,'..'),data=join(root,'data'),name=process.argv[2];
if(!name||!/^rct-[0-9T-]+\.sqlite$/.test(name))throw Error('Provide a backup filename from data/backups');
const source=join(data,'backups',basename(name));if(!existsSync(source))throw Error('Backup not found');
const check=new DatabaseSync(source,{readOnly:true});const result=check.prepare('PRAGMA integrity_check').get();check.close();if(Object.values(result)[0]!=='ok')throw Error('Backup integrity check failed');
mkdirSync(data,{recursive:true});const target=join(data,'rct.sqlite');const safety=join(data,'pre-restore-'+Date.now()+'.sqlite');
if(existsSync(target))copyFileSync(target,safety);
// Existing WAL files must not be present: shut server down and checkpoint before restore.
for(const suffix of ['-wal','-shm'])if(existsSync(target+suffix))throw Error('Existing WAL/SHM file found. Safely checkpoint/stop database before restoring; current database was copied to '+safety);
copyFileSync(source,target);console.log('Restore complete. Previous database snapshot:',safety);
