# RCT Manager v0.8

Upgrades the original v0.7 codebase. Keep your existing `data/` folder. Automatic additive SQLite migration creates attendance, reconciliation, pass token, and schema migration tables.

## Installation (Windows PowerShell)
1. Stop the current Node server (`Ctrl+C`). Copy the ENTIRE `data` folder, including `.sqlite`, `-wal`, `-shm` and photos, while the server is stopped. Prefer making a verified application backup before stopping it.
2. Unzip this project into the existing project directory, replacing source files but **do not overwrite data**.
3. Run `npm install`, `npm --prefix client install`, `npm run build`, `npm start`.
4. Open the local address, log in, select **V8 Operations**.
5. The original v0.7 endpoints and data structures remain in place.

## HTTPS on local Wi-Fi
Use an approved trusted TLS certificate matching the hostname/IP used by every device. For example, Windows PowerShell:
```
$env:TLS_CERT='C:\\rct-certs\\rct.crt'
$env:TLS_KEY='C:\\rct-certs\\rct.key'
$env:PORT='3443'
npm start
```
Open `https://<certificate-hostname>:3443`. Trust the issuing CA on every device. Do **not** bypass browser warnings. Without TLS_CERT and TLS_KEY, port 3000 starts in HTTP development mode only. Home-network addresses may change. Keep the private key outside the repository. Reissued certificates and trust distribution are required for production.

## Permissions
`admin`: staff management, backup, pass authorization, reconciliation; `registrar`: registration and attendance; `viewer`: read-only for new v8 endpoints and guarded core editing routes. Legacy v0.7 endpoints should undergo a full authorization audit before production.

## Backups and restore
In V8 Operations an administrator can create and download consistent SQLite snapshots with `VACUUM INTO`. Photo files are **not in SQLite**: back up `data/student-photos/` alongside `data/backups/`. To restore, stop server, ensure no active WAL/SHM files after proper checkpoint, and run `node server/restore-backup.mjs BACKUP_FILENAME`. Restore safety copy is created. Test restore with a copy first.

## M-Pesa
Pasted confirmation-text reference extraction remains from v0.7. v0.8 adds a human review workflow (pending/verified/rejected). A reference or screenshot never proves funds were received. Actual M-Pesa API verification and image/PDF OCR are not implemented.

## QR
For an internally approved pass, V8 Operations offers a PNG QR. It encodes a random token in a LAN verification URL, which resolves only for signed-in staff. The student pass print preview embeds a QR for internally approved passes; scans require authenticated access to the LAN verification API. No official JKUAT access authorization is implied.

## Manual acceptance tests
- Create students on two devices, confirm shared database and permanent numbers.
- Add supplementary enrollment; verify one student and one pass.
- Upload photo; approve pass as admin; view QR and verify token as staff; revoke pass and verify invalid.
- Create staff with registrar and viewer roles; viewer cannot write attendance or register students; registrar cannot reconcile or manage backups.
- Record attendance for a valid intake date, update same date, confirm no duplicate; reject future dates and out-of-intake dates.
- Change completion status explicitly and download attendance CSV/PDF.
- Record M-Pesa reference, confirm pending until administrator checks it, then verify or reject.
- Create backup; confirm `PRAGMA integrity_check` on downloaded file; restore into a test clone and verify row counts and photos.
- Test HTTPS on Windows and phone with trusted certificate; reject nontrusted certificate.

## Testing limitations
This build requires npm dependencies. Production use requires full end-to-end tests, trusted TLS, database/photo backup automation, strict role audit, and institutional approval for actual student/pass records.
