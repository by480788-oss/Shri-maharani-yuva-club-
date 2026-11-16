# Security Specification — Shri Maharani Yuba Club

## 1. Data Invariants
1. Normal registration can NEVER create an `admins/{uid}` document or elevate `approvalStatus` / `activeStatus` / `memberCode`.
2. `members/{uid}` creation is server-only (via `registerMember` or `adminCreateMember` Cloud Functions).
3. A member cannot read or list other members' PII (`users`, `members`, `donations`).
4. Donation verification (`status: VERIFIED` / `REJECTED`) and `fund_transactions` creation can ONLY happen server-side via Admin or the `adminVerifyDonation` Cloud Function.
5. `email_otps` is strictly inaccessible to all clients.
6. `admin_activity_logs` is append-only by verified Admins; updates and deletes are permanently forbidden.

## 2. Adversarial "Dirty Dozen" Payloads (All Must Return PERMISSION_DENIED)
1. **Privilege Escalation on `admins/{uid}`**: Client writes `{ uid, role: "SUPER_ADMIN", active: true }` -> DENIED (`allow write: if false`).
2. **Self-Approving Member Registration**: Client creates `members/{uid}` with `approvalStatus: "APPROVED"` -> DENIED (`allow create: if false`).
3. **Self-Updating Approval Status**: Member updates own `members/{uid}` with `{ approvalStatus: "APPROVED", memberCode: "SMYC-0001" }` -> DENIED (`affectedKeys().hasOnly(['fullName', 'address', 'privacyShowPhone', 'privacyShowEmail', 'updatedAt'])`).
4. **PII Scraping `members` List**: Non-admin authenticated member runs `list` on `/members` -> DENIED (`allow list: if isAdmin()`).
5. **Cross-User PII Read on `users/{otherUid}`**: Member reads `users/{otherUid}` -> DENIED (`request.auth.uid == uid`).
6. **Self-Verifying Donation**: Member creates `donations/{id}` with `status: "VERIFIED"` -> DENIED (`incoming().status == 'PENDING'`).
7. **Negative / Zero Donation Amount**: Member creates `donations/{id}` with `amount: -500` -> DENIED (`incoming().amount > 0`).
8. **Shadow Field Injection on Donation**: Member creates `donations/{id}` with `verifiedByUid: "hacker"` -> DENIED (`keys().hasOnly(...)`).
9. **Tampering with Financial Ledger**: Non-admin writes `fund_transactions/{id}` -> DENIED (`isAdmin()`).
10. **Reading Server OTP Hashes**: Client reads `email_otps/{docId}` -> DENIED (`allow read, write: if false`).
11. **Deleting Audit Logs**: Even Super Admin attempts `delete` on `admin_activity_logs/{id}` -> DENIED (`allow update, delete: if false`).
12. **ID Poisoning**: Client writes `donations/..junk..1500chars` -> DENIED (`isValidId(docId)`).
