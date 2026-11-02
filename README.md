# RCT Manager — Phase 1 Working Prototype

A local-network student enrollment app built with React, Express, and Node.js built-in SQLite. The SQLite file stays on the host computer. All other devices use a web browser.

## Requirements

- Windows 11, Node.js 24+ and npm
- Home Wi-Fi connecting the host PC and other devices
- Development test data only (fictional students)

## Install and start

1. Extract the ZIP to `Documents\rct-enrollment-manager` (do not create a folder inside another folder with the same name).
2. Open the folder in VS Code, then **Terminal > New Terminal**.
3. Run:

   ```powershell
   npm install
   npm --prefix client install
   npm run build
   npm start
   ```

4. On the host PC open `http://localhost:3000`.
5. On first run, **create an administrator** with a 12+ character password, then sign in.
6. Create an intake, register a fictional student and record a test payment.
7. On a phone connected to the same Wi-Fi, open `http://192.168.0.102:3000` **if that is still your PC's IPv4 address**. Check `ipconfig` again if it changed.

Note: This app uses the same-origin React production build through Express. **Do not use the Vite dev server from your phone**; use port 3000.

## Troubleshooting

- If the phone cannot connect, check the PC is on, `npm start` is running, both devices are on the same Wi-Fi, the router does not isolate Wi-Fi clients, and Windows Firewall permits incoming TCP connections to port 3000 on the **Private** network profile. Do not open a router port forward or expose the server to the internet.
- If port 3000 is already busy, stop the conflicting program or set `PORT` in your shell. The phone address must then use that port.
- If `node:sqlite` is unavailable, confirm `node -v` is 24+.
- Local database: `data/rct.sqlite` (and SQLite WAL files). Back up only after stopping the server. Treat this folder as sensitive.

## Security and scope

**Prototype only.** The example LAN address uses unencrypted HTTP. Use **fictional student and payment data only** until a trusted HTTPS certificate, role permissions, tested backups, audited payment controls and institutional authorization are implemented. Avoid using passwords reused from other accounts. Do not forward router ports. First account is an administrator; additional staff-account management is not implemented yet. The app does not integrate with live M-Pesa or issue official payment receipts.

## Contents

- 20 seeded courses based on the provided brochure (fees should be confirmed)
- Staff administrator setup and server-side login sessions
- Course catalogue and intake creation
- Student enrollment, repeat-profile matching by name and phone, capacity enforcement
- Manual test payments, outstanding balances and dashboard
- Central SQLite database and activity log foundation

## Future work

- HTTPS via university-managed name or locally trusted CA
- Granular staff roles, stronger duplicate matching, payment reversal with audit, receipt printing
- Export and restore workflow, migrations, attendance and certificate eligibility
- Robust login throttling, CSRF protection, server hardening and automated regression tests


## Phase 2 upgrade (v0.2)

Stop the server before replacing files. **Back up `data/rct.sqlite` and its `-wal` and `-shm` files if present after the server is stopped.** Keep your existing `data/` directory. Overwrite source files with this release, then run `npm install`, `npm --prefix client install`, `npm run build`, `npm start`. Schema upgrades are additive and run automatically at startup.

New administrator setup uses email and password. For an existing v0.1 administrator, sign in with the old username in the email/identity field **temporarily**, visit **My account**, register an email, then use email for future logins. Guardian fields are optional and are stored per student. This release has no real email delivery or password reset; email is only a login identifier. Do not use real personal data until HTTPS and security testing are completed.


## v0.3 update
- Confirmed RCT department relationship: https://www.jkuat.ac.ke/directorate/ict/?page_id=17219
- Two-panel JKUAT/RCT informational login with locally bundled course-brochure photo (works offline).
- Additional optional student information and emergency/sponsor contact fields; additive SQLite migration.
- Provisional student enrollment slip via browser Print / Save as PDF, **not** an authorized university gate pass. Awaiting approved gate-pass layout.
- Upgrade: back up the existing `data/` folder with the server stopped. Replace app code only; keep `data/`, then `npm install`, `npm --prefix client install`, `npm run build`, `npm start`.
- Prototype only: home LAN is HTTP; do not enter real student or guardian data until HTTPS and institutional controls are implemented.


## Version 0.4 additions
- Editable student profiles including guardian and emergency contacts; changes recorded in audit log.
- Search student directory by name, student number, phone, email, or guardian.
- Payment history with provisional printable payment acknowledgements (save to PDF via browser).
- Serial payment acknowledgement references derived from payment IDs. These are NOT official finance receipts or independently verified payments.
- Payment recording now uses a SQLite immediate transaction to prevent a race condition with concurrent writes.
- The provisional enrollment slip remains available pending an institution-approved gate pass design.

IMPORTANT: Stop v0.3, back up its complete data directory (including WAL/SHM files), then replace code with v0.4. Do not overwrite your existing data directory. Restart and run npm install, npm --prefix client install, npm run build, npm start. Use only fictional data over HTTP.


## Version 0.5 upgrade
- BACK UP THE ENTIRE `data` DIRECTORY BEFORE REPLACING CODE. Stop the server first.
- Keep your existing `data` folder when updating. Migration replaces only legacy RCT-hex student numbers using first enrolled intake and course; custom numbers are left unchanged. Review migrated numbers before production.
- Each course gets a stable unique code. Permanent numbers are `CODE/YYYY/MM/NNN`, assigned once to a student. Supplementary enrollment reuses the same student profile.
- The `student_passes` table holds exactly one current pass record per student with audit logging for updates. Passes must be authorized by staff; printable preview is marked NOT VALID FOR ACCESS and contains no signature.
- The implementation requires Node 24+ for built-in SQLite.
- Run `npm install`, `npm --prefix client install`, `npm run build`, `npm start`. Use fictitious data until HTTPS and institutional approvals are in place.
# rct-enrollment-manager
