✅ Mô tả quan hệ trong models:

Event.tags → ref Tag (N:M bằng array)

Event.userId → ref User (N:1)

Reminder.eventId → ref Event (N:1)

Comment.eventId → ref Event (N:1), Comment.userId → ref User (N:1)

AuditLog.userId → ref User, targetId có thể là Event, Tag, Comment hoặc User
