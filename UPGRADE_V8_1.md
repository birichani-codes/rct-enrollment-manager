# RCT Manager v0.8.1 — Interface copy and training records

This update changes interface wording without implying that JKUAT has approved a deployment, payment, or gate-pass issuance process.

## Install without losing student records

1. Stop the server. Copy the whole `data/` folder to a secure backup, including WAL/SHM files if present.
2. Replace the application code from this ZIP; retain your existing `data/` folder.
3. Run `npm install`, then `npm --prefix client install`.
4. Run `npm run build` and `npm start`. Database migration is additive (`students.is_training_record`).
5. Check that existing students, staff accounts, enrollments and payments are unchanged.

## Add five fictional training students (optional)

With the server stopped and a backup made, execute `npm run seed:training`. The script inserts five marked fictional records and course enrollments in a December 2026 training intake. It never issues gate passes or records fictional payments. It skips students already added by a prior run, and rolls back on error. Numbers are generated from the current course/month sequence rather than hardcoded.

Example student emails end in `.invalid`; phone numbers are not real phone contacts. Training records are marked with `is_training_record=1` in the database. Do not mix them into official institutional reports; delete them through a reviewed administrative cleanup process after testing.

## Validation checklist

- Sign in with an existing staff account; confirm all pre-existing records remain.
- Check the revised login panel and footer wording.
- Run training seed twice; first run creates 5 records, second creates 0.
- Confirm each training student has one permanent registration number and a matching enrollment.
- Confirm training students receive no automatic approved passes or verified payments.
- Check reporting totals: test records will appear in existing reports until record-type filters are added.
- Verify secure HTTPS and institutional authorization before operational use; wording changes alone do not implement those safeguards.
