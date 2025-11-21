# Personal Schedule App - API Reference with Sample User Data

## 1️⃣ User / Auth APIs

| Method | Endpoint             | Auth | Input JSON                                                                            | Output JSON                                                                                                              |
| ------ | -------------------- | ---- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| POST   | `/api/auth/register` | ❌   | `{ "name": "Nguyen Van A", "email": "user@example.com", "password": "Password123!" }` | `{ "user": { "id": "...", "name": "Nguyen Van A", "email": "user@example.com", "role": "user" }, "token": "JWT_TOKEN" }` |
| POST   | `/api/auth/login`    | ❌   | `{ "email": "user@example.com", "password": "Password123!" }`                         | `{ "user": { "id": "...", "name": "Nguyen Van A", "email": "user@example.com", "role": "user" }, "token": "JWT_TOKEN" }` |
| GET    | `/api/users/me`      | ✅   | -                                                                                     | `{ "user": { "id": "...", "name": "Nguyen Van A", "email": "user@example.com", "role": "user" }, "token": "JWT_TOKEN" }` |

## 2️⃣ Event APIs

| Method | Endpoint           | Auth | Input JSON                                                                                                                                                                    | Output JSON                                                                                                                                                                                 |
| ------ | ------------------ | ---- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| POST   | `/api/events`      | ✅   | `{ "title": "Meeting", "description": "Discuss project", "startTime": "2025-11-25T09:00:00Z", "endTime": "2025-11-25T10:00:00Z", "status": "pending", "tags": ["TAG_ID_1"] }` | `{ "event": { "_id": "...", "title": "Meeting", "description": "Discuss project", "startTime": "...", "endTime": "...", "status": "pending", "tags": ["TAG_ID_1"], "userId": "USER_ID" } }` |
| GET    | `/api/events`      | ✅   | -                                                                                                                                                                             | `{ "events": [ { "_id": "...", "title": "Meeting", ... } ] }`                                                                                                                               |
| PUT    | `/api/events/[id]` | ✅   | `{ "title": "Updated title" }`                                                                                                                                                | `{ "event": { "_id": "...", "title": "Updated title", ... } }`                                                                                                                              |
| DELETE | `/api/events/[id]` | ✅   | -                                                                                                                                                                             | `{ "message": "Event deleted successfully." }`                                                                                                                                              |

## 3️⃣ Tag APIs

| Method | Endpoint         | Auth | Input JSON                                      | Output JSON                                                                                 |
| ------ | ---------------- | ---- | ----------------------------------------------- | ------------------------------------------------------------------------------------------- |
| POST   | `/api/tags`      | ✅   | `{ "name": "Work", "color": "#ff0000" }`        | `{ "tag": { "_id": "...", "name": "Work", "color": "#ff0000", "userId": "USER_ID" } }`      |
| GET    | `/api/tags`      | ✅   | -                                               | `{ "tags": [ { "_id": "...", "name": "Work", "color": "#ff0000", "userId": "USER_ID" } ] }` |
| PUT    | `/api/tags/[id]` | ✅   | `{ "name": "Updated Tag", "color": "#00ff00" }` | `{ "tag": { "_id": "...", "name": "Updated Tag", "color": "#00ff00" } }`                    |
| DELETE | `/api/tags/[id]` | ✅   | -                                               | `{ "message": "Tag deleted successfully." }`                                                |

## 4️⃣ Comment APIs

| Method | Endpoint                           | Auth | Input JSON                                                  | Output JSON                                                                                                                         |
| ------ | ---------------------------------- | ---- | ----------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| POST   | `/api/comments`                    | ✅   | `{ "eventId": "EVENT_ID_1", "content": "Remember report" }` | `{ "comment": { "_id": "...", "eventId": "EVENT_ID_1", "userId": "USER_ID", "content": "Remember report" } }`                       |
| GET    | `/api/comments?eventId=EVENT_ID_1` | ✅   | -                                                           | `{ "comments": [ { "_id": "...", "eventId": "EVENT_ID_1", "userId": { "name": "Nguyen Van A" }, "content": "Remember report" } ] }` |
| PUT    | `/api/comments/[id]`               | ✅   | `{ "content": "Updated content" }`                          | `{ "comment": { "_id": "...", "content": "Updated content" } }`                                                                     |
| DELETE | `/api/comments/[id]`               | ✅   | -                                                           | `{ "message": "Comment deleted successfully." }`                                                                                    |

## 5️⃣ Reminder APIs

| Method | Endpoint              | Auth | Input JSON                                                    | Output JSON                                                                                 |
| ------ | --------------------- | ---- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| POST   | `/api/reminders`      | ✅   | `{ "eventId": "EVENT_ID_1", "time": "2025-11-25T08:45:00Z" }` | `{ "reminder": { "_id": "...", "eventId": "EVENT_ID_1", "time": "2025-11-25T08:45:00Z" } }` |
| GET    | `/api/reminders`      | ✅   | -                                                             | `{ "reminders": [ { "_id": "...", "eventId": "EVENT_ID_1", "time": "..." } ] }`             |
| DELETE | `/api/reminders/[id]` | ✅   | -                                                             | `{ "message": "Reminder deleted successfully." }`                                           |

## 6️⃣ AuditLog APIs (Admin Only)

| Method | Endpoint          | Auth       | Input JSON / Query Params                        | Output JSON                                                                                                                                                                      |
| ------ | ----------------- | ---------- | ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| GET    | `/api/audit-logs` | ✅ (admin) | `?userId=USER_ID&action=create&targetType=Event` | `{ "logs": [ { "_id": "...", "userId": { "name": "Nguyen Van A" }, "action": "create", "targetType": "Event", "targetId": "EVENT_ID_1", "meta": {...}, "timestamp": "..." } ] }` |

## Notes

- Sequence sử dụng API: Register → Login → Create Tags → Create Events → Create Comments → Create Reminders → (Admin) GET AuditLogs.
- JWT cần được gửi trong header `Authorization: Bearer JWT_TOKEN` hoặc cookie `token=JWT_TOKEN`.
- Tất cả model đều có `createdAt` và `updatedAt` timestamps.
- `TAG_ID_1`, `EVENT_ID_1`, `USER_ID` là các giá trị `_id` trả về từ API trước.
