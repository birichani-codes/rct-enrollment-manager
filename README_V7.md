# RCT Manager v0.7 — upgrade notes

## Installation
1. Stop v0.6 and copy its entire `data` directory to a safe backup. Keep both `rct.sqlite` and, if present, its `-wal`/`-shm` files as part of a consistent stopped-server backup; include `student-photos`.
2. Replace application source files from this package, **preserving your existing `data` folder**.
3. Run `npm install`, `npm --prefix client install`, `npm run build`, `npm start`.
4. Test with fictional student data on localhost and on a phone connected to the same LAN.

## v0.7 changes
- JKUAT reference crest instead of training-brochure photograph, with birichani.codes developer credit. The crest is a **crop from the user-supplied pass image**; replace with a university-approved high-quality crest file before official deployment.
- Intake start must be today or later for newly created intakes; completion date is calculated from course duration by calendar months on server.
- Capacity can be left unspecified. Existing capacity values remain stored but `capacity_confirmed` defaults to false. Confirm limits with RCT staff.
- Student pass dates are determined from the student's enrollments and populated automatically; backdated/expired pass approval is rejected.
- CSV and PDF downloads are available for students, enrollments, and payments.
- M-Pesa confirmation *text* can be pasted and parsed to suggest transaction code. **No OCR image/PDF scanning and no M-Pesa account verification are implemented in this release.** Do not rely on manually typed or extracted codes as proof of payment.

## Security limitations
- HTTP LAN access is not safe for real student data. Deploy trusted HTTPS, firewall controls, authorization, backups, and data-protection procedures first.
- Gate-pass preview is a development mockup, not an official university access pass. No official signature is reproduced.
- Before upgrade, make a backup and test migration with a disposable copy of the database.
