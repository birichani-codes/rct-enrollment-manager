# RCT Manager v0.6 — local LAN development release

## What changed
- Student profile view combining contact information, course history, per-enrollment balances and pass status.
- Authenticated upload of one student portrait (JPEG or PNG, maximum 2 MB) stored on the central server in `data/student-photos/`. An updated portrait is automatically reused on printable pass previews.
- New `photo_filename` migration is additive; existing student and registration records are preserved.
- Pass status `approved` requires a photo, while the resulting printout remains explicitly marked as a **development preview, not a campus access authorization**.
- Staff-only CSV exports for students, enrollments/fee balances and payments.
- Registration number and single-pass-per-student rules retained from v0.5.

## Windows upgrade steps
1. Stop the old server (Ctrl+C). Close all application processes.
2. Back up the COMPLETE `data` folder **and** any SQLite WAL/SHM files, as well as the `data/student-photos` folder if it exists. Do not overwrite this data folder.
3. Extract this ZIP. Copy application code over your existing project, preserving the `data` folder.
4. In PowerShell, in the project root, run:

```powershell
npm install
npm --prefix client install
npm run build
npm start
```

5. Open `http://localhost:3000` on the server PC, and the server's LAN IP on your test phone. Only use fictional students until HTTPS, institutional permissions, role enforcement and backups have been independently validated.

## Test plan
- Register a fictional student and save the initial registration number.
- Open Students > Profile; upload a portrait under 2 MB; refresh the page and verify the image persists.
- Add a second intake enrollment under the same name + phone; verify the original number and one student profile remain.
- Use Student Passes to issue a draft; try approving with and without a photo (without must be rejected).
- Open printable preview and verify it includes the profile portrait and original registration number.
- Verify CSV exports contain appropriate data and preserve leading zeros when imported as text.
- Test concurrently from two browsers on the same network, including a phone.

## Important limitations
- No institutional authority to issue campus passes is implied. No real signature or verified crest is embedded.
- File-upload checks enforce a 2 MB limit and JPEG/PNG signatures, but do not yet perform photo decoding, dimension verification, malware inspection, or EXIF sanitization. Do not upload real student photographs until those controls and retention/privacy policy are approved.
- Photo change is reflected in future printable pass previews; an immutable issuance snapshot/versioned pass history is **not implemented**.
- HTTPS, full granular roles, encrypted backup/restore and automated regression tests are **not implemented** in this release. The existing cookie authentication is retained.
- Full frontend build could not be verified in the authoring environment due to unavailable npm dependencies; run `npm run build` on Windows and report any errors.
