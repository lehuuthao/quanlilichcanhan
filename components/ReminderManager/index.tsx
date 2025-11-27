"use client";

import React, { useState, useEffect } from "react";
import {
  Pane,
  Button,
  Spinner,
  TextInput,
  toaster,
  IconButton,
  Tooltip,
  TickIcon,
  CrossIcon,
} from "evergreen-ui";
import RemindersService, {
  Reminder,
  CreateReminderPayload,
  UpdateReminderPayload,
} from "@/services/reminders.service";

interface ReminderManagerProps {
  selected: string[];
  onSelect: (ids: string[]) => void;
  eventId?: string;
}

export const ReminderManager: React.FC<ReminderManagerProps> = ({
  selected,
  onSelect,
  eventId,
}) => {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newTime, setNewTime] = useState("");

  const loadReminders = async () => {
    if (!eventId) return;
    setLoading(true);
    try {
      const res = await RemindersService.getReminders();
      const filtered = res.reminders.filter((r) => r.eventId === eventId);
      setReminders(filtered);
    } catch {
      toaster.danger("Failed to load reminders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReminders();
  }, [eventId]);

  const handleToggle = (id: string) => {
    onSelect(
      selected.includes(id)
        ? selected.filter((s) => s !== id)
        : [...selected, id]
    );
  };

  const handleCreate = async () => {
    if (!eventId || !newTime) return;
    setSaving(true);
    try {
      const payload: CreateReminderPayload = { eventId, time: newTime };
      const res = await RemindersService.createReminder(payload);
      setReminders([...reminders, res.reminder]);
      onSelect([...selected, res.reminder._id]);
      setNewTime("");
      toaster.success("Reminder created!");
    } catch {
      toaster.danger("Failed to create reminder");
    } finally {
      setSaving(false);
    }
  };

  const handleUpdate = async (id: string, time: string) => {
    setSaving(true);
    try {
      const payload: UpdateReminderPayload = { time };
      const res = await RemindersService.updateReminder(id, payload);
      setReminders(reminders.map((r) => (r._id === id ? res.reminder : r)));
      toaster.success("Reminder updated!");
      setEditingId(null);
    } catch {
      toaster.danger("Failed to update reminder");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    setSaving(true);
    try {
      await RemindersService.deleteReminder(id);
      setReminders(reminders.filter((r) => r._id !== id));
      onSelect(selected.filter((s) => s !== id));
      toaster.success("Reminder deleted!");
    } catch {
      toaster.danger("Failed to delete reminder");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Pane display="flex" justifyContent="center" paddingY={10}>
        <Spinner size={20} />
      </Pane>
    );
  }

  return (
    <Pane
      display="flex"
      flexDirection="column"
      gap={8}
      maxHeight={256}
      overflowY="auto"
    >
      {reminders.map((r) => (
        <Pane
          key={r._id}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          padding={8}
          borderRadius={6}
          backgroundColor={selected.includes(r._id) ? "#e0f2ff" : "#f5f6fa"}
          border="1px solid #d0d7e2"
          cursor="pointer"
          onClick={() => handleToggle(r._id)}
          gap={8}
        >
          {editingId === r._id ? (
            <Pane display="flex" alignItems="center" gap={4} flex={1}>
              <TextInput
                type="datetime-local"
                value={r.time}
                onChange={(e) => setNewTime(e.target.value)}
                flex={1}
              />
              <IconButton
                icon={TickIcon}
                intent="success"
                onClick={(e) => {
                  e.stopPropagation();
                  handleUpdate(r._id, newTime || r.time);
                }}
              />
              <IconButton
                icon={CrossIcon}
                onClick={(e) => {
                  e.stopPropagation();
                  setEditingId(null);
                }}
              />
            </Pane>
          ) : (
            <>
              <Pane flex={1}>
                {new Date(r.time).toLocaleString([], {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Pane>
              <Pane display="flex" gap={4}>
                <Tooltip content="Edit">
                  <IconButton
                    icon={TickIcon}
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingId(r._id);
                      setNewTime(r.time);
                    }}
                  />
                </Tooltip>
                <Tooltip content="Delete">
                  <IconButton
                    icon={CrossIcon}
                    size="small"
                    intent="danger"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(r._id);
                    }}
                  />
                </Tooltip>
              </Pane>
            </>
          )}
        </Pane>
      ))}

      {eventId && (
        <Pane display="flex" gap={8} alignItems="center">
          <TextInput
            type="datetime-local"
            placeholder="New reminder..."
            value={newTime}
            onChange={(e) => setNewTime(e.target.value)}
            flex={1}
          />
          <Button intent="success" onClick={handleCreate} disabled={saving}>
            {saving ? <Spinner size={16} /> : "Add"}
          </Button>
        </Pane>
      )}
    </Pane>
  );
};
