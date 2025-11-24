"use client";

import React, { useState, useEffect } from "react";
import { Spinner, Pane, Button, toaster, TextInput } from "evergreen-ui";
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
    } catch (err) {
      console.error(err);
      toaster.danger("Failed to load reminders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReminders();
  }, [eventId]);

  const handleToggle = (id: string) => {
    if (selected.includes(id)) {
      onSelect(selected.filter((sid) => sid !== id));
    } else {
      onSelect([...selected, id]);
    }
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
    } catch (err) {
      console.error(err);
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
    } catch (err) {
      console.error(err);
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
      onSelect(selected.filter((sid) => sid !== id));
      toaster.success("Reminder deleted!");
    } catch (err) {
      console.error(err);
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
    <div className="flex flex-col gap-2 max-h-64 overflow-auto border p-2 rounded">
      {reminders.map((r) => (
        <div key={r._id} className="flex items-center justify-between gap-2">
          {editingId === r._id ? (
            <TextInput
              type="datetime-local"
              value={r.time}
              onChange={(e) => handleUpdate(r._id, e.target.value)}
            />
          ) : (
            <Button
              appearance="minimal"
              onClick={() => handleToggle(r._id)}
              intent={selected.includes(r._id) ? "success" : "none"}
            >
              {new Date(r.time).toLocaleString()}
            </Button>
          )}
          <div className="flex gap-1">
            <Button
              appearance="minimal"
              intent="warning"
              onClick={() => setEditingId(r._id)}
            >
              Edit
            </Button>
            <Button
              appearance="minimal"
              intent="danger"
              onClick={() => handleDelete(r._id)}
            >
              Delete
            </Button>
          </div>
        </div>
      ))}

      {eventId && (
        <div className="flex gap-2 mt-2">
          <input
            type="datetime-local"
            className="border p-1 rounded flex-1"
            value={newTime}
            onChange={(e) => setNewTime(e.target.value)}
          />
          <Button onClick={handleCreate} intent="success" disabled={saving}>
            {saving ? <Spinner size={16} /> : "Add"}
          </Button>
        </div>
      )}
    </div>
  );
};
