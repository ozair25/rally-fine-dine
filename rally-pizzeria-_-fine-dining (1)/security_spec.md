# Firestore Security Specification

## Data Invariants
1. A **User** document must match the authenticated user's UID. Only admins can view all users.
2. **Menu Items** are publicly readable but only writable by admins.
3. **Orders** can only be created by signed-in users. Users can only read their own orders. Admins can read all orders.
4. **Delivery Zones** are publicly readable for verification, but only writable by admins.
5. **Admins** collection is a private registry of administrative UIDs.

## The Dirty Dozen Payloads (Target: DENIED)
1. **User Spoofing**: Attempting to create a user document with a UID that doesn't match `request.auth.uid`.
2. **Role Escalation**: A customer attempting to update their `role` to 'admin'.
3. **Menu Poisoning**: An unauthenticated or non-admin user attempting to create/update/delete a menu item.
4. **Order Hijacking**: User A attempting to read User B's order.
5. **Price Tampering**: Submitting an order with a `totalPrice` that doesn't match the items' calculations (client-side logic must be verified by admin later, but rules can enforce basic type/presence).
6. **Status Manipulation**: A customer attempting to mark an order as 'delivered' or 'accepted'.
7. **Orphaned Order**: Creating an order without a `userId`.
8. **Zone Injection**: A non-admin user attempting to modify delivery zones.
9. **Identity Poisoning**: Using a 1MB string as a document ID.
10. **Shadow Fields**: Adding an `isVerified: true` field to a collection that doesn't support it.
11. **PII Leak**: An unauthenticated user attempting to list all user documents.
12. **Future Timestamp**: Submitting an order with a `createdAt` in the future (though we use `request.time`).

## The Test Runner (Plan)
We will use `@firebase/rules-unit-testing` or similar logic in our thought process to ensure all operations are governed.

## Draft Rules (Drafting `DRAFT_firestore.rules`)
(Will follow in the next step)
