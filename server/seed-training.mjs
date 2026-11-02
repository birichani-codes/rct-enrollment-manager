import {DatabaseSync} from 'node:sqlite';
import {existsSync} from 'node:fs';
import {join,resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=resolve(fileURLToPath(new URL('..',import.meta.url)));
const dbPath=join(root,'data','rct.sqlite');
if(!existsSync(dbPath)){console.error('Database not found. Start the app once before running the training seed.');process.exit(1)}
const db=new DatabaseSync(dbPath);
db.exec('PRAGMA foreign_keys=ON; PRAGMA busy_timeout=5000;');
const need=['students','courses','intakes','enrollments','reg_sequences'];
for(const table of need){if(!db.prepare('SELECT name FROM sqlite_master WHERE type=? AND name=?').get('table',table)){console.error('Required table missing: '+table);process.exit(1)}}
const cols=db.prepare('PRAGMA table_info(students)').all().map(x=>x.name);
if(!cols.includes('is_training_record'))db.exec('ALTER TABLE students ADD COLUMN is_training_record INTEGER NOT NULL DEFAULT 0');
const dataset=[
 {name:'Amina Njeri',email:'amina.njeri@example.invalid',phone:'0000000001',guardian:'Grace Njeri',gphone:'0000000011',course:'Computer Packages'},
 {name:'Brian Otieno',email:'brian.otieno@example.invalid',phone:'0000000002',guardian:'Peter Otieno',gphone:'0000000012',course:'Software Engineering Level I'},
 {name:'Cynthia Wambui',email:'cynthia.wambui@example.invalid',phone:'0000000003',guardian:'Mary Wambui',gphone:'0000000013',course:'Digital Marketing'},
 {name:'David Mwangi',email:'david.mwangi@example.invalid',phone:'0000000004',guardian:'John Mwangi',gphone:'0000000014',course:'Artificial Intelligence Essentials'},
 {name:'Esther Achieng',email:'esther.achieng@example.invalid',phone:'0000000005',guardian:'Rose Achieng',gphone:'0000000015',course:'Data Analytics with Python'}
];
const startDate='2026-12-01';
const addMonths=(date,months)=>{const [y,m,d]=date.split('-').map(Number);const next=new Date(Date.UTC(y,m-1+months,1));next.setUTCDate(Math.min(d,new Date(Date.UTC(next.getUTCFullYear(),next.getUTCMonth()+1,0)).getUTCDate()));return next.toISOString().slice(0,10)};
function nextNo(code){const key='202612',prefix=`${code}/2026/12/`;let last=db.prepare('SELECT last_seq FROM reg_sequences WHERE course_code=? AND year_month=?').get(code,key)?.last_seq||0;for(const r of db.prepare('SELECT student_no FROM students WHERE student_no LIKE ?').all(prefix+'%')){const n=Number(r.student_no.slice(prefix.length));if(Number.isInteger(n))last=Math.max(last,n)}last++;db.prepare('INSERT INTO reg_sequences(course_code,year_month,last_seq) VALUES(?,?,?) ON CONFLICT(course_code,year_month) DO UPDATE SET last_seq=excluded.last_seq').run(code,key,last);return prefix+String(last).padStart(3,'0')}
let created=0,skipped=0;
db.exec('BEGIN IMMEDIATE');
try{
 for(const person of dataset){
  const existing=db.prepare('SELECT id FROM students WHERE email=?').get(person.email);
  if(existing){skipped++;continue}
  const c=db.prepare('SELECT id,code,fee,months FROM courses WHERE name=?').get(person.course);
  if(!c||!c.code)throw Error('Course is not configured: '+person.course);
  const label='Training records - December 2026';
  db.prepare('INSERT OR IGNORE INTO intakes(course_id,label,start_date,end_date,capacity,capacity_confirmed) VALUES(?,?,?,?,0,0)').run(c.id,label,startDate,addMonths(startDate,c.months));
  const intake=db.prepare('SELECT id FROM intakes WHERE course_id=? AND label=?').get(c.id,label);
  const no=nextNo(c.code);
  const st=db.prepare('INSERT INTO students(student_no,name,phone,email,guardian_name,guardian_relationship,guardian_phone,is_training_record) VALUES(?,?,?,?,?,?,?,1)').run(no,person.name,person.phone,person.email,person.guardian,'Guardian',person.gphone);
  db.prepare('INSERT INTO enrollments(student_id,intake_id,fee_at_enrollment,status) VALUES(?,?,?,?)').run(st.lastInsertRowid,intake.id,c.fee,'registered');
  created++;
 }
 db.exec('COMMIT');console.log(`Training seed complete: ${created} created, ${skipped} already present. No real students were modified.`);
}catch(e){db.exec('ROLLBACK');console.error('Training seed failed; changes rolled back:',e.message);process.exitCode=1}finally{db.close()}
