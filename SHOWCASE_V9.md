# RCT Manager v0.9 — Showcase Edition

## Contents
- Standalone demonstration database with 50 fictional students, 8 intakes, 20 courses, supplementary enrollments, sample payments, attendance and draft passes.
- No operational student records are included. All phone numbers and emails use non-functional fictional identifiers.
- The application runs on the computer hosting this project. Remote access needs internet and that computer to remain online.

## Install on Windows (Node.js 24+ recommended)
1. Extract into a NEW folder, not over your existing RCT installation.
2. Open terminal in the extracted `rct-enrollment-manager` folder.
3. Run `npm install`, then `npm --prefix client install`, then `npm run build`.
4. Run `npm start` and open `http://localhost:3000`.
5. Create a demo administrator with your own email and strong password (not reused elsewhere). There is no bundled default password.
6. Sign in. Dashboard metrics and reports are based on the sample SQLite data.

## Temporary public internet access (optional)
Install `cloudflared` from its official Cloudflare documentation, then run `START_REMOTE_WINDOWS.cmd` in a second terminal while `npm start` is running. The terminal displays an unpredictable `https://...trycloudflare.com` URL. Open it on a phone using mobile data. Shut down the tunnel when the demonstration ends.

SECURITY: A quick tunnel is a public URL, not a private VPN or access-control layer; the application's login is the only gate. Avoid real student data. Use an identity-protected tunnel (e.g. Cloudflare Access with an approved hostname) if you need controlled external access. Do not use a quick tunnel for operational records. Do not port-forward your home router.

## Reset
Stop the server and remote tunnel. Run `RESET_SHOWCASE_WINDOWS.cmd` and type `RESET`. This discards all changes to the demonstration database INCLUDING admin logins, and restores the original 50 fictional students. Restart and create a new demo admin. Student photographs uploaded after seeding, if any, are NOT cleared by the reset; delete them manually only in this isolated demo installation.

## Migration from v0.8.1 and Version 10
The source is based on v0.8.1, but this edition carries its own demonstration SQLite database. NEVER copy the demo `data` folder into a real installation. Version 10 should retain its own operational data and use a controlled schema migration.

## Verify
1. Open the student directory; confirm exactly 50 fictional students on a fresh installation.
2. Check the course catalogue (20), intakes (8), and enrollment reports (more than 50 records due to supplementary courses).
3. Check manual payments and reconciliation states; sample references are NOT real M-Pesa payments.
4. Check attendance entries, course completion status, dashboard totals, PDF and CSV downloads.
5. Connect from a different network using the temporary tunnel URL; confirm staff login is required.
6. Stop the tunnel and verify remote URL no longer works.
7. Stop app and reset data, restart and verify the 50-record baseline.

## Limitations
The package is a showcase, not a production deployment. QR passes remain controlled; no signed/approved passes or valid university credentials are preloaded. Certificate-based local HTTPS and separate identity-gated remote access are needed for real institutional data. The application may have preexisting frontend/build issues and should be tested locally.
