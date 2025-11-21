# API Documentation - Personal Schedule App

## 1. User / Auth APIs

| Method | Endpoint             | Auth | Description                        |
| ------ | -------------------- | ---- | ---------------------------------- |
| POST   | `/api/auth/register` | ❌   | Đăng ký user mới                   |
| POST   | `/api/auth/login`    | ❌   | Đăng nhập, trả về JWT              |
| GET    | `/api/users/me`      | ✅   | Lấy thông tin user hiện tại từ JWT |

## 2. Event APIs

| Method | Endpoint           | Auth | Description                  |
| ------ | ------------------ | ---- | ---------------------------- |
| POST   | `/api/events`      | ✅   | Tạo sự kiện mới              |
| GET    | `/api/events`      | ✅   | Lấy tất cả sự kiện của user  |
| PUT    | `/api/events/[id]` | ✅   | Cập nhật sự kiện (chỉ owner) |
| DELETE | `/api/events/[id]` | ✅   | Xóa sự kiện (chỉ owner)      |

## 3. Tag APIs

| Method | Endpoint         | Auth | Description              |
| ------ | ---------------- | ---- | ------------------------ |
| POST   | `/api/tags`      | ✅   | Tạo tag mới              |
| GET    | `/api/tags`      | ✅   | Lấy tất cả tag của user  |
| PUT    | `/api/tags/[id]` | ✅   | Cập nhật tag (chỉ owner) |
| DELETE | `/api/tags/[id]` | ✅   | Xóa tag (chỉ owner)      |

## 4. Comment APIs

| Method | Endpoint                 | Auth | Description                   |
| ------ | ------------------------ | ---- | ----------------------------- |
| POST   | `/api/comments`          | ✅   | Tạo comment cho event         |
| GET    | `/api/comments?eventId=` | ✅   | Lấy tất cả comment theo event |
| PUT    | `/api/comments/[id]`     | ✅   | Cập nhật comment (chỉ owner)  |
| DELETE | `/api/comments/[id]`     | ✅   | Xóa comment (chỉ owner)       |

## 5. Reminder APIs

| Method | Endpoint              | Auth | Description            |
| ------ | --------------------- | ---- | ---------------------- |
| POST   | `/api/reminders`      | ✅   | Tạo reminder cho event |
| GET    | `/api/reminders`      | ✅   | Lấy tất cả reminder    |
| DELETE | `/api/reminders/[id]` | ✅   | Xóa reminder           |

## 6. AuditLog APIs

| Method | Endpoint          | Auth       | Description                                                   |
| ------ | ----------------- | ---------- | ------------------------------------------------------------- |
| GET    | `/api/audit-logs` | ✅ (admin) | Lấy tất cả log, có thể filter theo userId, action, targetType |

## Notes

- Tất cả API yêu cầu **JWT trong cookie** ngoại trừ register/login.
- Mỗi model đều có timestamp `createdAt` và `updatedAt`.
- `authenticate` middleware được dùng để kiểm tra JWT và lấy thông tin user.
- Admin mới được phép xem AuditLog.
